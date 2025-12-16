"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, ExternalLink, Share2, Download, Clock } from "lucide-react"

interface VerdictResult {
  verdict: "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIABLE"
  confidence: number
  claim: string
  reasoning: string
  sources: {
    name: string
    url: string
    type: string
  }[]
  processingTime: number
}

const verdictConfig = {
  TRUE: {
    icon: CheckCircle,
    label: "TRUE",
    color: "text-verdict-true",
    bgColor: "bg-verdict-true/10",
    borderColor: "border-verdict-true/30",
  },
  FALSE: {
    icon: XCircle,
    label: "FALSE",
    color: "text-verdict-false",
    bgColor: "bg-verdict-false/10",
    borderColor: "border-verdict-false/30",
  },
  MISLEADING: {
    icon: AlertTriangle,
    label: "MISLEADING",
    color: "text-verdict-misleading",
    bgColor: "bg-verdict-misleading/10",
    borderColor: "border-verdict-misleading/30",
  },
  UNVERIFIABLE: {
    icon: HelpCircle,
    label: "UNVERIFIABLE",
    color: "text-verdict-unverified",
    bgColor: "bg-verdict-unverified/10",
    borderColor: "border-verdict-unverified/30",
  },
}

const sourceTypeColors: Record<string, string> = {
  official: "bg-aura-emerald-muted text-aura-emerald",
  scientific: "bg-primary/10 text-primary",
  factcheck: "bg-aura-amber-muted text-aura-amber",
  news: "bg-secondary text-secondary-foreground",
}

interface VerdictCardProps {
  result: VerdictResult
}

export function VerdictCard({ result }: VerdictCardProps) {
  const config = verdictConfig[result.verdict]
  const Icon = config.icon

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className={`${config.borderColor} border-2`}>
        <CardHeader className={`${config.bgColor} rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Icon className={`h-16 w-16 ${config.color}`} />
              </motion.div>
              <div>
                <h2 className={`text-3xl font-display font-bold ${config.color}`}>{config.label}</h2>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-muted-foreground">Confidence: {result.confidence}%</span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {result.processingTime}s
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="bg-transparent">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Confidence Bar */}
          <div className="mt-4">
            <Progress value={result.confidence} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Claim */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">CLAIM</h3>
            <p className="text-lg font-medium">&ldquo;{result.claim}&rdquo;</p>
          </div>

          {/* Reasoning */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">AI EXPLANATION</h3>
            <p className="text-muted-foreground leading-relaxed">{result.reasoning}</p>
          </div>

          {/* Sources */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">SOURCES & EVIDENCE</h3>
            <div className="flex flex-wrap gap-2">
              {result.sources.map((source) => (
                <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer">
                  <Badge variant="secondary" className={`${sourceTypeColors[source.type] || ""} cursor-pointer`}>
                    {source.name}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Badge>
                </a>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button variant="outline" className="rounded-full bg-transparent">
              View Knowledge Graph
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent">
              Report Issue
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent">
              Share on WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
