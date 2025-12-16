"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Float, Stars, Html } from "@react-three/drei"
import * as THREE from "three"
import type { Hotspot, Location } from "./trend-explorer"

interface TrendGlobeProps {
  hotspots: Hotspot[]
  selectedLocation: Location | null
  onLocationSelect: (location: Location) => void
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial color="#1a1a1f" roughness={0.8} metalness={0.2} />
      </Sphere>
      <Sphere args={[2.02, 32, 32]}>
        <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.08} />
      </Sphere>
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial color="#f97316" transparent opacity={0.03} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

function HotspotMarker({
  hotspot,
  onClick,
  isSelected,
}: { hotspot: Hotspot; onClick: () => void; isSelected: boolean }) {
  const ref = useRef<THREE.Mesh>(null)

  // Convert lat/lng to 3D position on sphere
  const position = useMemo(() => {
    const phi = (90 - hotspot.location.lat) * (Math.PI / 180)
    const theta = (hotspot.location.lng + 180) * (Math.PI / 180)
    const radius = 2.05

    return [
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ] as [number, number, number]
  }, [hotspot.location])

  const color = useMemo(() => {
    switch (hotspot.severity) {
      case "critical":
        return "#dc2626"
      case "high":
        return "#f97316"
      case "medium":
        return "#f59e0b"
      case "low":
        return "#22c55e"
      default:
        return "#6b7280"
    }
  }, [hotspot.severity])

  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      ref.current.scale.setScalar(isSelected ? scale * 1.5 : scale)
    }
  })

  return (
    <group position={position}>
      <mesh ref={ref} onClick={onClick}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Pulse ring */}
      <mesh>
        <ringGeometry args={[0.08, 0.12, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Label on hover/select */}
      {isSelected && (
        <Html position={[0, 0.15, 0]} center>
          <div className="px-2 py-1 rounded bg-card/90 backdrop-blur text-xs whitespace-nowrap border border-border">
            {hotspot.location.name}
          </div>
        </Html>
      )}
    </group>
  )
}

function Scene({
  hotspots,
  selectedLocation,
  onLocationSelect,
}: {
  hotspots: Hotspot[]
  selectedLocation: Location | null
  onLocationSelect: (location: Location) => void
}) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#f97316" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />

      <Float speed={1} rotationIntensity={0} floatIntensity={0.2}>
        <Globe />
        {hotspots.map((hotspot) => (
          <HotspotMarker
            key={hotspot.id}
            hotspot={hotspot}
            onClick={() => onLocationSelect(hotspot.location)}
            isSelected={selectedLocation?.id === hotspot.location.id}
          />
        ))}
      </Float>

      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

export function TrendGlobe({ hotspots, selectedLocation, onLocationSelect }: TrendGlobeProps) {
  return (
    <div className="w-full h-full bg-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <Scene hotspots={hotspots} selectedLocation={selectedLocation} onLocationSelect={onLocationSelect} />
      </Canvas>
    </div>
  )
}
