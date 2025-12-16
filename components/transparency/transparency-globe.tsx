"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Sphere, Stars, Html, OrbitControls, Line } from "@react-three/drei"
import * as THREE from "three"
import { TextureLoader } from "three"
import { useTheme } from "next-themes"

interface MisinfoPoint {
  id: string
  lat: number
  lng: number
  city: string
  country: string
  claim: string
  verdict: "FALSE" | "MISLEADING" | "UNVERIFIABLE"
  source: string
  date: string
  views: number
  originalUrl: string
  summary: string
  category: string
  severity: string
}

interface TransparencyGlobeProps {
  data: MisinfoPoint[]
  selectedPoint: MisinfoPoint | null
  onSelectPoint: (point: MisinfoPoint | null) => void
}

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

const continentOutlines: [number, number][][] = [
  // North America
  [
    [60, -140],
    [50, -125],
    [35, -120],
    [25, -110],
    [20, -100],
    [25, -80],
    [30, -85],
    [40, -75],
    [45, -65],
    [50, -55],
    [55, -60],
    [60, -65],
    [70, -140],
    [60, -140],
  ],
  // South America
  [
    [10, -75],
    [5, -80],
    [0, -80],
    [-5, -80],
    [-10, -78],
    [-15, -75],
    [-20, -65],
    [-30, -70],
    [-40, -65],
    [-50, -75],
    [-55, -70],
    [-50, -58],
    [-40, -55],
    [-30, -50],
    [-20, -40],
    [-10, -35],
    [0, -50],
    [5, -60],
    [10, -75],
  ],
  // Europe
  [
    [35, -10],
    [40, -10],
    [45, 0],
    [50, 5],
    [55, 10],
    [60, 25],
    [65, 30],
    [70, 30],
    [70, 40],
    [65, 50],
    [55, 40],
    [50, 30],
    [45, 15],
    [40, 20],
    [35, -10],
  ],
  // Africa
  [
    [35, -5],
    [30, 10],
    [25, 35],
    [15, 40],
    [5, 45],
    [-5, 40],
    [-15, 45],
    [-25, 35],
    [-35, 25],
    [-35, 18],
    [-25, 15],
    [-15, 12],
    [-5, 8],
    [5, 0],
    [15, -15],
    [25, -15],
    [35, -5],
  ],
  // Asia
  [
    [70, 40],
    [75, 80],
    [70, 100],
    [65, 120],
    [55, 140],
    [45, 145],
    [35, 130],
    [25, 120],
    [15, 105],
    [5, 100],
    [10, 80],
    [20, 70],
    [30, 60],
    [40, 55],
    [55, 60],
    [70, 40],
  ],
  // Australia
  [
    [-15, 125],
    [-20, 145],
    [-30, 150],
    [-35, 140],
    [-35, 120],
    [-25, 115],
    [-15, 125],
  ],
]

function ContinentLine({ outline, radius }: { outline: [number, number][]; radius: number }) {
  const points = useMemo(() => {
    return outline.map(([lat, lng]) => {
      const v = latLngToVector3(lat, lng, radius)
      return [v.x, v.y, v.z] as [number, number, number]
    })
  }, [outline, radius])

  return <Line points={points} color="#f97316" lineWidth={1} transparent opacity={0.35} />
}

function MisinfoPin({
  point,
  globeRadius,
  isSelected,
  onSelect,
}: {
  point: MisinfoPoint
  globeRadius: number
  isSelected: boolean
  onSelect: (point: MisinfoPoint | null) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)

  const position = useMemo(
    () => latLngToVector3(point.lat, point.lng, globeRadius + 0.03),
    [point.lat, point.lng, globeRadius],
  )

  const verdictColor = point.verdict === "FALSE" ? "#ef4444" : point.verdict === "MISLEADING" ? "#f59e0b" : "#6b7280"
  const pinSize = point.severity === "critical" ? 0.08 : point.severity === "high" ? 0.06 : 0.05

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3 + point.lat) * 0.25
      meshRef.current.scale.setScalar(isSelected ? 1.8 : pulse)
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      const opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + point.lng) * 0.2
      mat.opacity = isSelected ? 0.6 : opacity
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 2
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3
      ringRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Main pin */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(isSelected ? null : point)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default"
        }}
      >
        <sphereGeometry args={[pinSize, 16, 16]} />
        <meshBasicMaterial color={verdictColor} />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[pinSize * 2, 16, 16]} />
        <meshBasicMaterial color={verdictColor} transparent opacity={0.3} />
      </mesh>

      {/* Animated ring */}
      {(isSelected || point.severity === "critical") && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[pinSize * 1.5, pinSize * 2, 32]} />
          <meshBasicMaterial color={verdictColor} transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Label on hover/select */}
      {isSelected && (
        <Html position={[0, 0.2, 0]} center distanceFactor={10}>
          <div className="bg-card/95 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg border border-border animate-in zoom-in-95 duration-150">
            {point.city}
          </div>
        </Html>
      )}
    </group>
  )
}

function Globe({
  data,
  selectedPoint,
  onSelectPoint,
  isDark,
}: {
  data: MisinfoPoint[]
  selectedPoint: MisinfoPoint | null
  onSelectPoint: (point: MisinfoPoint | null) => void
  isDark: boolean
}) {
  const globeRef = useRef<THREE.Group>(null!)

  const globeRadius = 2

  // Load Earth texture
  const earthTexture = useLoader(
    TextureLoader,
    "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg"
  )

  // Theme-aware colors
  const atmosphereColor = isDark ? "#f97316" : "#3b82f6"

  // Auto-rotate when no selection
  useFrame(() => {
    if (!selectedPoint && globeRef.current) {
      globeRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={globeRef}>
      {/* Earth base with world map texture */}
      <Sphere args={[globeRadius, 64, 64]} onClick={() => onSelectPoint(null)}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={isDark ? 0.5 : 0.3}
          metalness={0.1}
          emissive={isDark ? "#000000" : "#1e3a5f"}
          emissiveIntensity={isDark ? 0 : 0.15}
        />
      </Sphere>

      {/* Latitude/longitude grid */}
      <Sphere args={[globeRadius + 0.01, 36, 36]}>
        <meshBasicMaterial color={atmosphereColor} wireframe transparent opacity={isDark ? 0.06 : 0.1} />
      </Sphere>

      {/* Inner atmosphere glow */}
      <Sphere args={[globeRadius + 0.1, 32, 32]}>
        <meshBasicMaterial color={atmosphereColor} transparent opacity={isDark ? 0.04 : 0.06} side={THREE.BackSide} />
      </Sphere>

      {/* Outer atmosphere */}
      <Sphere args={[globeRadius + 0.2, 32, 32]}>
        <meshBasicMaterial color={atmosphereColor} transparent opacity={isDark ? 0.02 : 0.04} side={THREE.BackSide} />
      </Sphere>

      {continentOutlines.map((outline, i) => (
        <ContinentLine key={i} outline={outline} radius={globeRadius + 0.02} />
      ))}

      {/* Misinformation pins */}
      {data.map((point) => (
        <MisinfoPin
          key={point.id}
          point={point}
          globeRadius={globeRadius}
          isSelected={selectedPoint?.id === point.id}
          onSelect={onSelectPoint}
        />
      ))}
    </group>
  )
}

// Floating particles around globe
function FloatingParticle({
  startPosition,
  speed,
  offset,
  color,
}: {
  startPosition: [number, number, number]
  speed: number
  offset: number
  color: string
}) {
  const ref = useRef<THREE.Mesh>(null!)
  const [pos] = useState(() => ({ x: startPosition[0], y: startPosition[1], z: startPosition[2] }))

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset
      pos.x = startPosition[0] + Math.sin(t * 0.5) * 1.5
      pos.y = startPosition[1] + Math.cos(t * 0.3) * 1.5
      pos.z = startPosition[2] + Math.sin(t * 0.4) * 0.8
      ref.current.position.set(pos.x, pos.y, pos.z)

      const scale = 0.6 + Math.sin(t * 2) * 0.4
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={ref} position={startPosition}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

// Pre-generate particle configs
const particleConfigs = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  startPosition: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12] as [
    number,
    number,
    number,
  ],
  speed: 0.5 + Math.random() * 0.5,
  offset: Math.random() * Math.PI * 2,
  color: i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#22c55e" : "#f59e0b",
}))

function Scene({ data, selectedPoint, onSelectPoint, isDark }: TransparencyGlobeProps & { isDark: boolean }) {
  const lightColor = isDark ? "#f97316" : "#3b82f6"
  const accentColor = isDark ? "#22c55e" : "#8b5cf6"

  return (
    <>
      <ambientLight intensity={isDark ? 0.5 : 0.9} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 1.2 : 1.5} color={lightColor} />
      <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.5 : 0.8} color={accentColor} />
      <pointLight position={[0, 10, -10]} intensity={isDark ? 0.3 : 0.5} color="#f59e0b" />

      <Globe data={data} selectedPoint={selectedPoint} onSelectPoint={onSelectPoint} isDark={isDark} />

      {/* Floating particles */}
      {particleConfigs.map((config) => (
        <FloatingParticle key={config.id} {...config} />
      ))}

      {isDark && <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.3} />}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={10}
        autoRotate={!selectedPoint}
        autoRotateSpeed={0.3}
      />
    </>
  )
}

export function TransparencyGlobe({ data, selectedPoint, onSelectPoint }: TransparencyGlobeProps) {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark" || theme === "dark"

  return (
    <div className="w-full h-full bg-background">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <Scene data={data} selectedPoint={selectedPoint} onSelectPoint={onSelectPoint} isDark={isDark} />
      </Canvas>
    </div>
  )
}
