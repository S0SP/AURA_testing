"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Float, Stars, Html, OrbitControls, Line } from "@react-three/drei"
import * as THREE from "three"

interface MisinfoPoint {
  id: string
  lat: number
  lng: number
  claim: string
  verdict: "FALSE" | "MISLEADING" | "UNVERIFIABLE"
  source: string
  date: string
  views: number
  originalUrl: string
  factCheckUrl: string
  summary: string
  category: string
}

const misinfoData: MisinfoPoint[] = [
  {
    id: "1",
    lat: 28.6139,
    lng: 77.209,
    claim: "5G towers spread COVID-19 virus through radio waves",
    verdict: "FALSE",
    source: "WhatsApp",
    date: "2025-01-15",
    views: 45230,
    originalUrl: "https://twitter.com/example/status/123",
    factCheckUrl: "/archive/1",
    summary: "Radio waves cannot transmit biological pathogens. COVID-19 spreads through respiratory droplets.",
    category: "Health",
  },
  {
    id: "2",
    lat: 40.7128,
    lng: -74.006,
    claim: "Vaccines contain microchips for tracking",
    verdict: "FALSE",
    source: "Facebook",
    date: "2025-01-14",
    views: 78900,
    originalUrl: "https://facebook.com/post/456",
    factCheckUrl: "/archive/2",
    summary: "Vaccine needles are too small for microchips. No tracking technology exists in vaccines.",
    category: "Health",
  },
  {
    id: "3",
    lat: 51.5074,
    lng: -0.1278,
    claim: "Climate change is a hoax created by governments",
    verdict: "FALSE",
    source: "Twitter",
    date: "2025-01-13",
    views: 123400,
    originalUrl: "https://twitter.com/example/status/789",
    factCheckUrl: "/archive/3",
    summary: "97% of climate scientists agree that climate change is real and human-caused.",
    category: "Environment",
  },
  {
    id: "4",
    lat: -23.5505,
    lng: -46.6333,
    claim: "Drinking bleach cures viral infections",
    verdict: "FALSE",
    source: "WhatsApp",
    date: "2025-01-12",
    views: 56700,
    originalUrl: "https://wa.me/message/abc",
    factCheckUrl: "/archive/4",
    summary: "Bleach is highly toxic and causes severe internal damage. Never consume cleaning products.",
    category: "Health",
  },
  {
    id: "5",
    lat: 35.6762,
    lng: 139.6503,
    claim: "AI will replace all jobs within 2 years",
    verdict: "MISLEADING",
    source: "News",
    date: "2025-01-11",
    views: 89100,
    originalUrl: "https://news.example.com/ai-jobs",
    factCheckUrl: "/archive/5",
    summary: "While AI will transform many industries, complete job replacement is overstated.",
    category: "Technology",
  },
  {
    id: "6",
    lat: 55.7558,
    lng: 37.6173,
    claim: "Election results were manipulated by foreign hackers",
    verdict: "UNVERIFIABLE",
    source: "Telegram",
    date: "2025-01-10",
    views: 234500,
    originalUrl: "https://t.me/channel/post",
    factCheckUrl: "/archive/6",
    summary: "No credible evidence found. Security agencies have not confirmed these claims.",
    category: "Political",
  },
  {
    id: "7",
    lat: -33.8688,
    lng: 151.2093,
    claim: "Wildfire was started intentionally by activists",
    verdict: "FALSE",
    source: "Facebook",
    date: "2025-01-09",
    views: 67800,
    originalUrl: "https://facebook.com/post/xyz",
    factCheckUrl: "/archive/7",
    summary: "Investigation confirmed natural causes. No evidence of intentional arson.",
    category: "Environment",
  },
  {
    id: "8",
    lat: 19.076,
    lng: 72.8777,
    claim: "New cryptocurrency guarantees 1000% returns",
    verdict: "FALSE",
    source: "WhatsApp",
    date: "2025-01-08",
    views: 45600,
    originalUrl: "https://wa.me/message/def",
    factCheckUrl: "/archive/8",
    summary: "This is a classic Ponzi scheme. No investment can guarantee such returns.",
    category: "Financial",
  },
]

// Convert lat/lng to 3D coordinates on sphere
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
    [60, -65],
    [70, -140],
    [60, -140],
  ],
  // South America
  [
    [10, -75],
    [0, -80],
    [-10, -78],
    [-20, -65],
    [-30, -70],
    [-50, -75],
    [-55, -70],
    [-40, -55],
    [-20, -40],
    [-5, -35],
    [5, -60],
    [10, -75],
  ],
  // Europe
  [
    [35, -10],
    [40, 0],
    [50, 5],
    [55, 10],
    [60, 25],
    [70, 30],
    [70, 50],
    [55, 40],
    [45, 15],
    [35, -10],
  ],
  // Africa
  [
    [35, -5],
    [30, 10],
    [20, 35],
    [5, 45],
    [-5, 40],
    [-20, 35],
    [-35, 25],
    [-35, 18],
    [-20, 15],
    [5, 0],
    [20, -15],
    [35, -5],
  ],
  // Asia
  [
    [70, 40],
    [75, 100],
    [65, 140],
    [45, 145],
    [35, 130],
    [20, 105],
    [5, 100],
    [15, 75],
    [30, 60],
    [45, 55],
    [60, 60],
    [70, 40],
  ],
  // Australia
  [
    [-15, 125],
    [-20, 150],
    [-35, 150],
    [-35, 115],
    [-20, 115],
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

  return <Line points={points} color="#f97316" lineWidth={1} transparent opacity={0.4} />
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

  const position = useMemo(
    () => latLngToVector3(point.lat, point.lng, globeRadius + 0.05),
    [point.lat, point.lng, globeRadius],
  )

  const verdictColor = point.verdict === "FALSE" ? "#ef4444" : point.verdict === "MISLEADING" ? "#f59e0b" : "#6b7280"

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + point.lat) * 0.2
      meshRef.current.scale.setScalar(isSelected ? 1.5 : scale)
    }
    if (glowRef.current) {
      const opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = isSelected ? 0.6 : opacity
    }
  })

  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Pin */}
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
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={verdictColor} />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={verdictColor} transparent opacity={0.3} />
      </mesh>

      {/* Pulse ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial color={verdictColor} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function MisinfoCard({ point, onClose }: { point: MisinfoPoint; onClose: () => void }) {
  const position = useMemo(() => latLngToVector3(point.lat, point.lng, 2.2), [point.lat, point.lng])

  const verdictColor =
    point.verdict === "FALSE" ? "bg-red-500" : point.verdict === "MISLEADING" ? "bg-amber-500" : "bg-gray-500"
  const verdictBg =
    point.verdict === "FALSE" ? "bg-red-500/10" : point.verdict === "MISLEADING" ? "bg-amber-500/10" : "bg-gray-500/10"

  return (
    <Html position={[position.x, position.y, position.z]} center distanceFactor={8}>
      <div
        className="w-72 bg-card/95 backdrop-blur-xl rounded-xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-3 ${verdictBg} border-b border-border flex items-center justify-between`}>
          <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${verdictColor}`}>{point.verdict}</span>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-background/50 hover:bg-background flex items-center justify-center transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-sm font-medium leading-tight line-clamp-2">{point.claim}</p>

          <p className="text-xs text-muted-foreground line-clamp-2">{point.summary}</p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-0.5 bg-secondary rounded-full">{point.source}</span>
            <span>{point.category}</span>
            <span>{(point.views / 1000).toFixed(1)}K views</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <a
              href={point.factCheckUrl}
              className="flex-1 py-2 px-3 bg-primary text-primary-foreground text-xs font-medium rounded-lg text-center hover:opacity-90 transition-opacity"
            >
              View Full Report
            </a>
            <a
              href={point.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Original
            </a>
          </div>
        </div>
      </div>
    </Html>
  )
}

function Globe({
  selectedPoint,
  onSelectPoint,
}: { selectedPoint: MisinfoPoint | null; onSelectPoint: (point: MisinfoPoint | null) => void }) {
  const globeGroupRef = useRef<THREE.Group>(null!)

  const globeRadius = 1.5

  // Auto-rotate globe
  useFrame(() => {
    if (globeGroupRef.current && !selectedPoint) {
      globeGroupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={globeGroupRef}>
      {/* Earth base */}
      <Sphere args={[globeRadius, 64, 64]} onClick={() => onSelectPoint(null)}>
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} metalness={0.1} />
      </Sphere>

      {/* Latitude/Longitude grid */}
      <Sphere args={[globeRadius + 0.01, 24, 24]}>
        <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.08} />
      </Sphere>

      {continentOutlines.map((outline, i) => (
        <ContinentLine key={i} outline={outline} radius={globeRadius + 0.02} />
      ))}

      {/* Atmosphere glow */}
      <Sphere args={[globeRadius + 0.15, 32, 32]}>
        <meshBasicMaterial color="#f97316" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      {/* Inner glow */}
      <Sphere args={[globeRadius - 0.02, 32, 32]}>
        <meshBasicMaterial color="#f97316" transparent opacity={0.02} />
      </Sphere>

      {/* Misinformation pins */}
      {misinfoData.map((point) => (
        <MisinfoPin
          key={point.id}
          point={point}
          globeRadius={globeRadius}
          isSelected={selectedPoint?.id === point.id}
          onSelect={onSelectPoint}
        />
      ))}

      {/* Selected point card */}
      {selectedPoint && <MisinfoCard point={selectedPoint} onClose={() => onSelectPoint(null)} />}
    </group>
  )
}

// Floating data particles
function DataParticle({
  delay,
  color,
  startPos,
}: { delay: number; color: string; startPos: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!)
  const [pos] = useState(() => ({ x: startPos[0], y: startPos[1], z: startPos[2] }))

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * 0.5 + delay) % 8
      pos.x = startPos[0] + Math.sin(t * 0.8) * 1.5
      pos.y = startPos[1] + Math.cos(t * 0.6) * 1.5
      pos.z = startPos[2] + Math.sin(t * 0.4) * 0.5
      ref.current.position.set(pos.x, pos.y, pos.z)

      const scale = 0.8 + Math.sin(t * 2) * 0.3
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={ref} position={startPos}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

// Platform nodes
const platforms = [
  { name: "Twitter", position: [2.5, 0.8, 0.5] as [number, number, number], color: "#525252" },
  { name: "WhatsApp", position: [-2.2, 1.2, 1] as [number, number, number], color: "#22c55e" },
  { name: "Facebook", position: [0.8, -2, 1.5] as [number, number, number], color: "#a855f7" },
  { name: "YouTube", position: [-1.2, 0.5, 2.2] as [number, number, number], color: "#ef4444" },
  { name: "Telegram", position: [1.8, -0.8, -1.8] as [number, number, number], color: "#0ea5e9" },
  { name: "News", position: [-0.8, 1.8, -2] as [number, number, number], color: "#f59e0b" },
]

function PlatformNode({ position, color, name }: { position: [number, number, number]; color: string; name: string }) {
  const ref = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15)
    }
    if (glowRef.current) {
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
      <group position={position}>
        <mesh ref={ref}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
        <Html position={[0, 0.3, 0]} center>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
            {name}
          </span>
        </Html>
      </group>
    </Float>
  )
}

function AnimatedWire({
  start,
  end,
  color,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
}) {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 1.5, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end),
    )
    return curve.getPoints(50).map((p) => [p.x, p.y, p.z] as [number, number, number])
  }, [start, end])

  return <Line points={points} color={color} lineWidth={1} transparent opacity={0.3} />
}

// Generate particles once
const particleConfigs = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  delay: i * 0.3,
  color: i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#22c55e" : "#f59e0b",
  startPos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] as [
    number,
    number,
    number,
  ],
}))

function Scene() {
  const [selectedPoint, setSelectedPoint] = useState<MisinfoPoint | null>(null)

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#f97316" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#22c55e" />
      <pointLight position={[0, 10, -10]} intensity={0.4} color="#f59e0b" />

      <Globe selectedPoint={selectedPoint} onSelectPoint={setSelectedPoint} />

      {/* Platform nodes */}
      {platforms.map((platform) => (
        <PlatformNode key={platform.name} position={platform.position} color={platform.color} name={platform.name} />
      ))}

      {/* Wire connections */}
      {platforms.map((platform) => (
        <AnimatedWire key={`wire-${platform.name}`} start={[0, 0, 0]} end={platform.position} color={platform.color} />
      ))}

      {/* Floating particles */}
      {particleConfigs.map((config) => (
        <DataParticle key={config.id} delay={config.delay} color={config.color} startPos={config.startPos} />
      ))}

      <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />

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

export function Globe3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  )
}
