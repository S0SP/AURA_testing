"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, TrendingUp, MessageSquare, AlertTriangle, ExternalLink, Search, Network } from "lucide-react"
import type { Trend } from "./trend-explorer"

interface TrendDetailsProps {
  trend: Trend
  onClose: () => void
  onViewKnowledgeGraph: () => void
}

const riskColors = {
  none: "bg-secondary text-secondary-foreground",
  low: "bg-aura-emerald-muted text-aura-emerald",
  medium: "bg-aura-amber-muted text-aura-amber",
  high: "bg-primary/10 text-primary",
  critical: "bg-verdict-false/10 text-verdict-false",
}

const sentimentColors = {
  positive: "text-aura-emerald",
  negative: "text-verdict-false",
  neutral: "text-muted-foreground",
}

const verdictColors = {
  TRUE: "bg-verdict-true/10 text-verdict-true",
  FALSE: "bg-verdict-false/10 text-verdict-false",
  MISLEADING: "bg-verdict-misleading/10 text-verdict-misleading",
  UNVERIFIABLE: "bg-verdict-unverified/10 text-verdict-unverified",
}

export function TrendDetails({ trend, onClose, onViewKnowledgeGraph }: TrendDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="border-t border-border bg-card"
    >
      <div className="container mx-auto p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-display font-bold flex items-center gap-2">
              <span className="text-primary">#</span>
              {trend.hashtag.replace("#", "")}
            </h2>
            <p className="text-muted-foreground">{trend.category}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Stats Cards */}
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tweet Volume</p>
                <p className="text-2xl font-bold">{trend.volume.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sentiment</p>
                <p className={`text-2xl font-bold capitalize ${sentimentColors[trend.sentiment]}`}>{trend.sentiment}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${riskColors[trend.riskLevel]}`}>
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-2xl font-bold uppercase">{trend.riskLevel}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Posts */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Sample Posts</h3>
          <div className="space-y-3">
            {trend.samplePosts.map((post, index) => (
              <Card key={index} className="bg-secondary/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium">{post.author}</span>
                    {post.verdict && (
                      <Badge className={verdictColors[post.verdict as keyof typeof verdictColors]}>
                        {post.verdict} ({post.confidence}%)
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">&ldquo;{post.content}&rdquo;</p>
                  {post.verdict && (
                    <Button variant="link" size="sm" className="px-0 mt-2">
                      View Full Analysis <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button className="rounded-full">
            <Search className="h-4 w-4 mr-2" />
            Fact-Check This Trend
          </Button>
          <Button variant="outline" className="rounded-full bg-transparent" onClick={onViewKnowledgeGraph}>
            <Network className="h-4 w-4 mr-2" />
            View Knowledge Graph
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
