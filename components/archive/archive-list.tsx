"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Eye, Clock, MessageCircle } from "lucide-react"
import type { FactCheck } from "./archive-explorer"

interface ArchiveListProps {
  factChecks: FactCheck[]
  selectedId: string | undefined
  onSelect: (factCheck: FactCheck) => void
}

const verdictConfig = {
  TRUE: { icon: CheckCircle, color: "text-verdict-true", bg: "bg-verdict-true/10" },
  FALSE: { icon: XCircle, color: "text-verdict-false", bg: "bg-verdict-false/10" },
  MISLEADING: { icon: AlertTriangle, color: "text-verdict-misleading", bg: "bg-verdict-misleading/10" },
  UNVERIFIABLE: { icon: HelpCircle, color: "text-verdict-unverified", bg: "bg-verdict-unverified/10" },
}

const sourceIcons: Record<string, typeof MessageCircle> = {
  WhatsApp: MessageCircle,
  Twitter: MessageCircle,
  Facebook: MessageCircle,
  Web: Eye,
}

export function ArchiveList({ factChecks, selectedId, onSelect }: ArchiveListProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">Fact-Check List</h2>
          <p className="text-sm text-muted-foreground">{factChecks.length} results</p>
        </div>

        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="p-4 space-y-3">
            {factChecks.map((factCheck, index) => {
              const config = verdictConfig[factCheck.verdict]
              const Icon = config.icon
              const SourceIcon = sourceIcons[factCheck.source] || Eye

              return (
                <div
                  key={factCheck.id}
                  onClick={() => onSelect(factCheck)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 group
                    ${
                      selectedId === factCheck.id
                        ? "bg-primary/5 border-primary shadow-lg shadow-primary/5 scale-[1.02]"
                        : "bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 hover:shadow-md"
                    }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: "fadeInUp 0.4s ease-out forwards",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${config.bg} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon
                        className={`h-5 w-5 ${config.color} transition-transform duration-300 group-hover:rotate-12`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {factCheck.claim}
                        </p>
                        <Badge
                          className={`${config.bg} ${config.color} shrink-0 transition-transform duration-200 group-hover:scale-105`}
                        >
                          {factCheck.verdict}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{factCheck.summary}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 transition-colors hover:text-foreground">
                          <SourceIcon className="h-3 w-3" />
                          {factCheck.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(factCheck.timestamp)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {(factCheck.views / 1000).toFixed(1)}K views
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {factCheck.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {factChecks.length === 0 && (
              <div className="py-12 text-center text-muted-foreground animate-in fade-in duration-300">
                No fact-checks found matching your filters
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
