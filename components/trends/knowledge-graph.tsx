"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { X, Maximize2, Download } from "lucide-react"
import * as THREE from "three"

interface KnowledgeGraphProps {
  onClose: () => void
}

const nodes = [
  { id: "claim", label: "5G causes COVID", type: "claim", position: [0, 0, 0] as [number, number, number] },
  { id: "covid", label: "COVID-19", type: "entity", position: [-2, 1, 0] as [number, number, number] },
  { id: "5g", label: "5G Technology", type: "entity", position: [2, 1, 0] as [number, number, number] },
  { id: "virus", label: "SARS-CoV-2", type: "entity", position: [-3, -1, 1] as [number, number, number] },
  { id: "radio", label: "Radio Waves", type: "entity", position: [3, -1, 1] as [number, number, number] },
  { id: "who", label: "WHO", type: "source", position: [-2, -2, -1] as [number, number, number] },
  { id: "cdc", label: "CDC", type: "source", position: [0, -2, -1] as [number, number, number] },
  { id: "verdict", label: "FALSE", type: "verdict", position: [0, 2, 0] as [number, number, number] },
]

const edges = [
  { from: "claim", to: "covid", label: "mentions" },
  { from: "claim", to: "5g", label: "mentions" },
  { from: "covid", to: "virus", label: "caused_by" },
  { from: "5g", to: "radio", label: "uses" },
  { from: "who", to: "claim", label: "refutes" },
  { from: "cdc", to: "claim", label: "refutes" },
  { from: "claim", to: "verdict", label: "resolved_as" },
]

const nodeColors: Record<string, string> = {
  claim: "#f97316",
  entity: "#a855f7",
  source: "#f59e0b",
  evidence: "#22c55e",
  verdict: "#ef4444",
}

function GraphNode({ node, onClick }: { node: (typeof nodes)[0]; onClick: () => void }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
      <group position={node.position}>
        <mesh ref={ref} onClick={onClick}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={nodeColors[node.type]}
            emissive={nodeColors[node.type]}
            emissiveIntensity={0.2}
          />
        </mesh>
        <Html position={[0, 0.5, 0]} center>
          <div className="px-2 py-1 rounded bg-card/90 backdrop-blur text-xs whitespace-nowrap border border-border">
            {node.label}
          </div>
        </Html>
      </group>
    </Float>
  )
}

function GraphEdge({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...from), new THREE.Vector3(...to)]
  }, [from, to])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([...from, ...to])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6b7280" transparent opacity={0.5} />
    </line>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {nodes.map((node) => (
        <GraphNode key={node.id} node={node} onClick={() => console.log(node.id)} />
      ))}

      {edges.map((edge, i) => {
        const fromNode = nodes.find((n) => n.id === edge.from)
        const toNode = nodes.find((n) => n.id === edge.to)
        if (!fromNode || !toNode) return null
        return <GraphEdge key={i} from={fromNode.position} to={toNode.position} />
      })}
    </>
  )
}

export function KnowledgeGraph({ onClose }: KnowledgeGraphProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button variant="outline" size="icon" className="bg-card">
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="bg-card">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onClose} className="bg-card">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-xl font-display font-bold mb-2">Knowledge Graph</h2>
        <p className="text-sm text-muted-foreground">Interactive visualization of claim relationships</p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 p-4 rounded-xl bg-card border border-border">
        <h4 className="text-xs font-medium mb-2">Node Types</h4>
        <div className="space-y-1">
          {Object.entries(nodeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
