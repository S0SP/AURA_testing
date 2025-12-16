"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageSquare, AlertTriangle, Scale, CheckCircle } from "lucide-react"

const agents = [
  {
    id: "retriever",
    name: "Evidence Retriever",
    role: "Searching databases",
    icon: Search,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "advocate",
    name: "Advocate",
    role: "Building supporting case",
    icon: MessageSquare,
    color: "text-aura-emerald",
    bgColor: "bg-aura-emerald-muted",
  },
  {
    id: "skeptic",
    name: "Skeptic",
    role: "Challenging the claim",
    icon: AlertTriangle,
    color: "text-verdict-false",
    bgColor: "bg-verdict-false/10",
  },
  {
    id: "judge",
    name: "Judge",
    role: "Rendering verdict",
    icon: Scale,
    color: "text-aura-amber",
    bgColor: "bg-aura-amber-muted",
  },
]

interface AgentWorkflowProps {
  activePhase: string | null
  isComplete: boolean
}

export function AgentWorkflow({ activePhase, isComplete }: AgentWorkflowProps) {
  const getAgentStatus = (agentId: string) => {
    if (isComplete) return "complete"
    if (!activePhase) return "idle"

    const currentIndex = agents.findIndex((a) => a.id === activePhase)
    const agentIndex = agents.findIndex((a) => a.id === agentId)

    if (agentIndex < currentIndex) return "complete"
    if (agentIndex === currentIndex) return "active"
    return "idle"
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Agent Verification Process</h3>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-8 left-8 right-8 h-0.5 bg-border hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {agents.map((agent, index) => {
              const status = getAgentStatus(agent.id)
              const Icon = agent.icon

              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`
                        relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                        ${status === "active" ? `${agent.bgColor} ring-2 ring-offset-2 ring-offset-background` : ""}
                        ${status === "complete" ? "bg-aura-emerald-muted" : ""}
                        ${status === "idle" ? "bg-secondary" : ""}
                        ${status === "active" ? "ring-primary scale-110" : ""}
                      `}
                    >
                      {status === "complete" ? (
                        <CheckCircle className="h-8 w-8 text-aura-emerald" />
                      ) : (
                        <Icon
                          className={`h-8 w-8 transition-all ${status === "active" ? agent.color : "text-muted-foreground"} ${status === "active" ? "animate-pulse" : ""}`}
                        />
                      )}
                    </div>
                    <h4 className="font-medium mt-3 text-sm">{agent.name}</h4>
                    <p className="text-xs text-muted-foreground">{agent.role}</p>

                    {status === "active" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 flex items-center gap-1"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-xs text-primary">Processing</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
