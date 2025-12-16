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
  MessageSquare,
  Clock,
  Globe,
  ChevronRight,
} from "lucide-react"
import { KnowledgeGraph } from "./knowledge-graph"
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
  const [activeAgent, setActiveAgent] = useState<string | null>(null)
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
    <Card
      className={`h-full ${config.border} border-2 overflow-hidden animate-in slide-in-from-right-5 fade-in duration-300`}
    >
      <ScrollArea className="h-full">
        {/* Verdict Header */}
        <CardHeader className={`${config.bg} transition-colors duration-300`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Icon className={`h-12 w-12 ${config.color} animate-in zoom-in duration-500`} />
                <div className={`absolute inset-0 ${config.bg} rounded-full blur-xl animate-pulse`} />
              </div>
              <div>
                <h2 className={`text-2xl font-display font-bold ${config.color}`}>{factCheck.verdict}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-muted-foreground">Confidence: {factCheck.confidence}%</span>
                  <Progress value={factCheck.confidence} className="w-24 h-2" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="transition-transform hover:scale-110">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="transition-transform hover:scale-110">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Claim */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: "100ms" }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">CLAIM</h3>
            <p className="text-lg font-medium">&ldquo;{factCheck.claim}&rdquo;</p>
          </div>

          {/* Metadata */}
          <div
            className="flex flex-wrap gap-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ animationDelay: "150ms" }}
          >
            <span className="flex items-center gap-1 transition-colors hover:text-foreground">
              <Clock className="h-4 w-4" />
              {formatDate(factCheck.timestamp)}
            </span>
            <span className="flex items-center gap-1 transition-colors hover:text-foreground">
              <MessageSquare className="h-4 w-4" />
              via {factCheck.source}
            </span>
            <span className="flex items-center gap-1 transition-colors hover:text-foreground">
              <Globe className="h-4 w-4" />
              {factCheck.language.toUpperCase()}
            </span>
            <Badge variant="secondary">{factCheck.category}</Badge>
          </div>

          {/* Tabbed Content */}
          <Tabs
            defaultValue="explanation"
            className="w-full animate-in fade-in duration-300"
            style={{ animationDelay: "200ms" }}
          >
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="explanation" className="transition-all data-[state=active]:shadow-md">
                Explanation
              </TabsTrigger>
              <TabsTrigger value="agents" className="transition-all data-[state=active]:shadow-md">
                Agent Debate
              </TabsTrigger>
              <TabsTrigger value="sources" className="transition-all data-[state=active]:shadow-md">
                Sources
              </TabsTrigger>
              <TabsTrigger value="graph" className="transition-all data-[state=active]:shadow-md">
                Knowledge Graph
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explanation" className="space-y-4 pt-4">
              {/* AI Explanation */}
              <div className="p-4 rounded-xl bg-secondary/50 transition-all hover:bg-secondary/70">
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
                    className="rounded-full h-12 w-12 bg-transparent transition-all hover:scale-110 hover:shadow-lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                  </Button>
                  <div className="flex-1">
                    <Progress value={isPlaying ? 35 : 0} className="h-2 mb-2 transition-all duration-300" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{isPlaying ? "0:32" : "0:00"}</span>
                      <span>1:24</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="transition-transform hover:scale-110">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-3">
                  {["English", "Hindi", "Marathi"].map((lang) => (
                    <Badge
                      key={lang}
                      variant={lang === "English" ? "default" : "secondary"}
                      className="cursor-pointer transition-all hover:scale-105"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agents" className="space-y-4 pt-4">
              {Object.entries(mockAgentDebate).map(([agent, text], index) => (
                <div
                  key={agent}
                  className={`p-4 rounded-xl bg-secondary/50 transition-all duration-300 cursor-pointer
                    ${activeAgent === agent ? "ring-2 ring-primary shadow-lg scale-[1.02]" : "hover:bg-secondary/70"}
                  `}
                  onClick={() => setActiveAgent(activeAgent === agent ? null : agent)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h4 className="font-medium capitalize mb-2 flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full transition-transform ${activeAgent === agent ? "scale-125" : ""} ${
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
                    <ChevronRight
                      className={`h-4 w-4 ml-auto transition-transform ${activeAgent === agent ? "rotate-90" : ""}`}
                    />
                  </h4>
                  <p
                    className={`text-sm text-muted-foreground transition-all ${activeAgent === agent ? "text-foreground" : ""}`}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="sources" className="space-y-4 pt-4">
              {mockSources.map((source, index) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium group-hover:text-primary transition-colors">{source.name}</span>
                      <Badge className={`${sourceTypeColors[source.type]} transition-transform group-hover:scale-105`}>
                        {source.type}
                      </Badge>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              <div className="h-80 rounded-xl bg-secondary/30 overflow-hidden border border-border">
                <KnowledgeGraph />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Hover over nodes to explore relationships
              </p>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            {["Share on WhatsApp", "Report Issue", "Download PDF"].map((action, i) => (
              <Button
                key={action}
                variant="outline"
                className="rounded-full bg-transparent transition-all hover:scale-105 hover:shadow-md"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {action}
              </Button>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
