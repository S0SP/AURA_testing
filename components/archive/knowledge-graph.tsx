"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, Float } from "@react-three/drei"
import * as THREE from "three"

interface GraphNode {
  id: string
  label: string
  type: "claim" | "source" | "evidence" | "verdict"
  position: [number, number, number]
}

interface GraphEdge {
  from: string
  to: string
  label: string
}

const graphData: { nodes: GraphNode[]; edges: GraphEdge[] } = {
  nodes: [
    { id: "claim", label: "5G spreads COVID", type: "claim", position: [0, 0, 0] },
    { id: "source1", label: "WHO Report", type: "source", position: [-2, 1.5, 0] },
    { id: "source2", label: "CDC Guidelines", type: "source", position: [2, 1.5, 0] },
    { id: "source3", label: "Nature Study", type: "source", position: [0, 2, 1] },
    { id: "evidence1", label: "Radio waves physics", type: "evidence", position: [-1.5, -1.5, 0.5] },
    { id: "evidence2", label: "Virus transmission", type: "evidence", position: [1.5, -1.5, 0.5] },
    { id: "verdict", label: "FALSE", type: "verdict", position: [0, -2.5, 0] },
  ],
  edges: [
    { from: "claim", to: "source1", label: "cited by" },
    { from: "claim", to: "source2", label: "cited by" },
    { from: "claim", to: "source3", label: "cited by" },
    { from: "source1", to: "evidence1", label: "provides" },
    { from: "source2", to: "evidence2", label: "provides" },
    { from: "evidence1", to: "verdict", label: "supports" },
    { from: "evidence2", to: "verdict", label: "supports" },
  ],
}

const nodeColors = {
  claim: "#f97316",
  source: "#22c55e",
  evidence: "#f59e0b",
  verdict: "#ef4444",
}

function GraphNode3D({
  node,
  isHovered,
  onHover,
}: { node: GraphNode; isHovered: boolean; onHover: (id: string | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const color = nodeColors[node.type]
  const size = node.type === "verdict" ? 0.4 : node.type === "claim" ? 0.35 : 0.25

  useFrame((state) => {
    if (meshRef.current) {
      const scale = isHovered ? 1.3 : 1 + Math.sin(state.clock.elapsedTime * 2 + node.position[0]) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
    if (glowRef.current) {
      const opacity = isHovered ? 0.4 : 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = opacity
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.2}>
      <group position={node.position}>
        <mesh ref={meshRef} onPointerOver={() => onHover(node.id)} onPointerOut={() => onHover(null)}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isHovered ? 0.5 : 0.2} />
        </mesh>
        <mesh ref={glowRef}>
          <sphereGeometry args={[size * 1.5, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
        <Html position={[0, size + 0.3, 0]} center>
          <div
            className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              isHovered ? "bg-card shadow-lg scale-110" : "bg-card/80"
            }`}
          >
            {node.label}
          </div>
        </Html>
      </group>
    </Float>
  )
}

function GraphEdge3D({
  from,
  to,
  isHighlighted,
}: { from: [number, number, number]; to: [number, number, number]; isHighlighted: boolean }) {
  const ref = useRef<THREE.Line>(null)

  const { geometry } = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...from),
      new THREE.Vector3((from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + 0.5, (from[2] + to[2]) / 2),
      new THREE.Vector3(...to),
    )
    return { geometry: new THREE.BufferGeometry().setFromPoints(curve.getPoints(30)) }
  }, [from, to])

  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.LineBasicMaterial
      material.opacity = isHighlighted ? 0.8 : 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={isHighlighted ? "#f97316" : "#6b7280"} transparent opacity={0.3} linewidth={2} />
    </line>
  )
}

function KnowledgeGraphScene() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  const highlightedEdges = useMemo(() => {
    if (!hoveredNode) return new Set<string>()
    return new Set(
      graphData.edges.filter((e) => e.from === hoveredNode || e.to === hoveredNode).map((e) => `${e.from}-${e.to}`),
    )
  }, [hoveredNode])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />

      <group ref={groupRef}>
        {/* Edges */}
        {graphData.edges.map((edge) => {
          const fromNode = graphData.nodes.find((n) => n.id === edge.from)
          const toNode = graphData.nodes.find((n) => n.id === edge.to)
          if (!fromNode || !toNode) return null

          return (
            <GraphEdge3D
              key={`${edge.from}-${edge.to}`}
              from={fromNode.position}
              to={toNode.position}
              isHighlighted={highlightedEdges.has(`${edge.from}-${edge.to}`)}
            />
          )
        })}

        {/* Nodes */}
        {graphData.nodes.map((node) => (
          <GraphNode3D key={node.id} node={node} isHovered={hoveredNode === node.id} onHover={setHoveredNode} />
        ))}
      </group>
    </>
  )
}

export function KnowledgeGraph() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <KnowledgeGraphScene />
      </Canvas>
    </div>
  )
}
