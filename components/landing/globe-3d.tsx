"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Float, Stars } from "@react-three/drei"
import * as THREE from "three"

// Platform nodes around the globe
const platforms = [
  { name: "Twitter", position: [2.2, 0.8, 0.5], color: "#525252" },
  { name: "WhatsApp", position: [-1.8, 1.2, 1], color: "#22c55e" },
  { name: "Facebook", position: [0.5, -1.8, 1.5], color: "#a855f7" },
  { name: "YouTube", position: [-1, 0.5, 2], color: "#ef4444" },
  { name: "Telegram", position: [1.5, -0.8, -1.5], color: "#22c55e" },
  { name: "News", position: [-0.5, 1.5, -1.8], color: "#f59e0b" },
]

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0008
    }
  })

  return (
    <group>
      {/* Earth */}
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial color="#1a1a1f" roughness={0.8} metalness={0.2} />
      </Sphere>

      {/* Grid lines on globe */}
      <Sphere args={[1.52, 32, 32]}>
        <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.1} />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere ref={atmosphereRef} args={[1.6, 32, 32]}>
        <meshBasicMaterial color="#f97316" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

function DataPoint({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.2)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      {/* Glow */}
      <mesh position={position}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </Float>
  )
}

function Wire({
  start,
  end,
  color,
}: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 1, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end),
    )
    return curve.getPoints(50)
  }, [start, end])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.4} />
    </line>
  )
}

function Particle({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const startPos = useMemo(
    () => [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8] as [number, number, number],
    [],
  )

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime + delay) % 5
      ref.current.position.x = startPos[0] + Math.sin(t) * 0.5
      ref.current.position.y = startPos[1] + Math.cos(t) * 0.5
      ref.current.position.z = startPos[2]
    }
  })

  return (
    <mesh ref={ref} position={startPos}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#f97316" transparent opacity={0.6} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#f97316" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />

      <Globe />

      {/* Platform nodes */}
      {platforms.map((platform, i) => (
        <DataPoint
          key={platform.name}
          position={platform.position as [number, number, number]}
          color={platform.color}
        />
      ))}

      {/* Wire connections */}
      {platforms.map((platform, i) => (
        <Wire
          key={`wire-${i}`}
          start={[0, 0, 0]}
          end={platform.position as [number, number, number]}
          color={platform.color}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Particle key={i} delay={i * 0.2} />
      ))}

      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

export function Globe3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  )
}
