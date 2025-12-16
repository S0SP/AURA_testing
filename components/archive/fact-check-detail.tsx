"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Share2,
  Download,
  Play,
  Pause,
  Volume2,
  Network,
  MessageSquare,
  Clock,
  Globe,
} from "lucide-react"
import type { FactCheck } from "./archive-explorer"

interface FactCheckDetailProps {
  factCheck: FactCheck
  onClose: () => void
}

const verdictConfig = {
  TRUE: {
    icon: CheckCircle,
    color: "text-verdict-true",
    bg: "bg-verdict-true/10",
    border: "border-verdict-true/30",
  },
  FALSE: {
    icon: XCircle,
    color: "text-verdict-false",
    bg: "bg-verdict-false/10",
    border: "border-verdict-false/30",
  },
  MISLEADING: {
    icon: AlertTriangle,
    color: "text-verdict-misleading",
    bg: "bg-verdict-misleading/10",
    border: "border-verdict-misleading/30",
  },
  UNVERIFIABLE: {
    icon: HelpCircle,
    color: "text-verdict-unverified",
    bg: "bg-verdict-unverified/10",
    border: "border-verdict-unverified/30",
  },
}

const mockSources = [
  { name: "WHO", type: "official", url: "https://who.int", relevance: 95 },
  { name: "CDC", type: "official", url: "https://cdc.gov", relevance: 92 },
  { name: "Reuters Fact Check", type: "factcheck", url: "https://reuters.com", relevance: 88 },
  { name: "Nature Journal", type: "scientific", url: "https://nature.com", relevance: 85 },
]

const mockAgentDebate = {
  retriever: "Found 47 relevant documents from WHO, CDC, and peer-reviewed journals.",
  advocate:
    "No credible scientific mechanism supports the claim. Electromagnetic waves cannot carry biological pathogens.",
  skeptic:
    "The claim conflates two unrelated technologies. 5G rollout timing coincided with pandemic but correlation is not causation.",
  judge:
    "Based on overwhelming scientific consensus, the claim is FALSE. Radio waves and viruses operate on entirely different physical principles.",
}

const sourceTypeColors: Record<string, string> = {
  official: "bg-aura-emerald-muted text-aura-emerald",
  scientific: "bg-primary/10 text-primary",
  factcheck: "bg-aura-amber-muted text-aura-amber",
  news: "bg-secondary text-secondary-foreground",
}

export function FactCheckDetail({ factCheck, onClose }: FactCheckDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const config = verdictConfig[factCheck.verdict]
  const Icon = config.icon

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className={`h-full ${config.border} border-2 overflow-hidden`}>
      <ScrollArea className="h-full">
        {/* Verdict Header */}
        <CardHeader className={config.bg}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Icon className={`h-12 w-12 ${config.color}`} />
              <div>
                <h2 className={`text-2xl font-display font-bold ${config.color}`}>{factCheck.verdict}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-muted-foreground">Confidence: {factCheck.confidence}%</span>
                  <Progress value={factCheck.confidence} className="w-24 h-2" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Claim */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">CLAIM</h3>
            <p className="text-lg font-medium">&ldquo;{factCheck.claim}&rdquo;</p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDate(factCheck.timestamp)}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              via {factCheck.source}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {factCheck.language.toUpperCase()}
            </span>
            <Badge variant="secondary">{factCheck.category}</Badge>
          </div>

          {/* Tabbed Content */}
          <Tabs defaultValue="explanation" className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="explanation">Explanation</TabsTrigger>
              <TabsTrigger value="agents">Agent Debate</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="graph">Knowledge Graph</TabsTrigger>
            </TabsList>

            <TabsContent value="explanation" className="space-y-4 pt-4">
              {/* AI Explanation */}
              <div className="p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium mb-2">AI Explanation</h4>
                <p className="text-muted-foreground leading-relaxed">{factCheck.summary}</p>
              </div>

              {/* Audio Player */}
              <div className="p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium mb-3">Audio Explanation</h4>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12 bg-transparent"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <div className="flex-1">
                    <Progress value={isPlaying ? 35 : 0} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{isPlaying ? "0:32" : "0:00"}</span>
                      <span>1:24</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-3">
                  {["English", "Hindi", "Marathi"].map((lang) => (
                    <Badge key={lang} variant={lang === "English" ? "default" : "secondary"} className="cursor-pointer">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agents" className="space-y-4 pt-4">
              {Object.entries(mockAgentDebate).map(([agent, text]) => (
                <div key={agent} className="p-4 rounded-xl bg-secondary/50">
                  <h4 className="font-medium capitalize mb-2 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        agent === "retriever"
                          ? "bg-primary"
                          : agent === "advocate"
                            ? "bg-aura-emerald"
                            : agent === "skeptic"
                              ? "bg-verdict-false"
                              : "bg-aura-amber"
                      }`}
                    />
                    {agent === "retriever"
                      ? "Evidence Retriever"
                      : agent === "advocate"
                        ? "Advocate"
                        : agent === "skeptic"
                          ? "Skeptic"
                          : "Judge"}
                  </h4>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="sources" className="space-y-4 pt-4">
              {mockSources.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{source.name}</span>
                      <Badge className={sourceTypeColors[source.type]}>{source.type}</Badge>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Relevance:</span>
                    <Progress value={source.relevance} className="flex-1 h-1.5" />
                    <span className="text-xs font-medium">{source.relevance}%</span>
                  </div>
                </a>
              ))}
            </TabsContent>

            <TabsContent value="graph" className="pt-4">
              <div className="h-64 rounded-xl bg-secondary/50 flex items-center justify-center">
                <div className="text-center">
                  <Network className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive Knowledge Graph</p>
                  <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                    Open Full View
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            <Button variant="outline" className="rounded-full bg-transparent">
              Share on WhatsApp
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent">
              Report Issue
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent">
              Download PDF
            </Button>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
