"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, TrendingUp, AlertTriangle, ChevronRight, Hash } from "lucide-react"
import type { Location, Hotspot, Trend } from "./trend-explorer"

const mockTrends: Trend[] = [
  {
    id: "1",
    hashtag: "#CovidVaccine5G",
    volume: 45230,
    sentiment: "negative",
    riskLevel: "high",
    category: "Health",
    samplePosts: [
      {
        author: "@user1",
        content: "5G towers causing corona in my city. Wake up people!",
        verdict: "FALSE",
        confidence: 96,
      },
    ],
  },
  {
    id: "2",
    hashtag: "#Election2025",
    volume: 128500,
    sentiment: "negative",
    riskLevel: "critical",
    category: "Political",
    samplePosts: [
      {
        author: "@user2",
        content: "EVMs are rigged, I have proof!",
        verdict: "UNVERIFIABLE",
        confidence: 45,
      },
    ],
  },
  {
    id: "3",
    hashtag: "#CryptoScam",
    volume: 23400,
    sentiment: "negative",
    riskLevel: "medium",
    category: "Financial",
    samplePosts: [
      {
        author: "@user3",
        content: "New token guaranteed 1000% returns!",
        verdict: "FALSE",
        confidence: 92,
      },
    ],
  },
  {
    id: "4",
    hashtag: "#WeatherAlert",
    volume: 8900,
    sentiment: "neutral",
    riskLevel: "low",
    category: "Weather",
    samplePosts: [
      {
        author: "@user4",
        content: "Heavy rainfall expected this weekend.",
        verdict: "TRUE",
        confidence: 88,
      },
    ],
  },
]

const riskColors = {
  none: "bg-secondary text-secondary-foreground",
  low: "bg-aura-emerald-muted text-aura-emerald",
  medium: "bg-aura-amber-muted text-aura-amber",
  high: "bg-primary/10 text-primary",
  critical: "bg-verdict-false/10 text-verdict-false",
}

interface TrendSidebarProps {
  selectedLocation: Location | null
  hotspots: Hotspot[]
  onTrendSelect: (trend: Trend) => void
  onLocationSelect: (location: Location) => void
}

export function TrendSidebar({ selectedLocation, hotspots, onTrendSelect, onLocationSelect }: TrendSidebarProps) {
  const [activeTab, setActiveTab] = useState<"trends" | "alerts">("trends")

  const alertCounts = {
    critical: hotspots.filter((h) => h.severity === "critical").length,
    high: hotspots.filter((h) => h.severity === "high").length,
    medium: hotspots.filter((h) => h.severity === "medium").length,
    low: hotspots.filter((h) => h.severity === "low").length,
  }

  return (
    <div className="w-full md:w-96 bg-card border-l border-border flex flex-col">
      {/* Location Info */}
      {selectedLocation && (
        <div className="p-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-semibold">{selectedLocation.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">{selectedLocation.country}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("trends")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "trends" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"
          }`}
        >
          <TrendingUp className="h-4 w-4 inline-block mr-2" />
          Trending Now
        </button>
        <button
          onClick={() => setActiveTab("alerts")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "alerts" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"
          }`}
        >
          <AlertTriangle className="h-4 w-4 inline-block mr-2" />
          Alerts
        </button>
      </div>

      <ScrollArea className="flex-1">
        {activeTab === "trends" ? (
          <div className="p-4 space-y-3">
            {mockTrends.map((trend, index) => (
              <Card
                key={trend.id}
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => onTrendSelect(trend)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-muted-foreground">{index + 1}</span>
                      <Hash className="h-4 w-4 text-primary" />
                      <span className="font-medium">{trend.hashtag.replace("#", "")}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{trend.volume.toLocaleString()} posts</span>
                    <Badge className={riskColors[trend.riskLevel]}>{trend.riskLevel.toUpperCase()}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Alert Summary */}
            <Card className="bg-secondary/30">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Misinformation Alerts</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-verdict-false/10">
                    <span className="text-sm">Critical</span>
                    <span className="font-bold text-verdict-false">{alertCounts.critical}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10">
                    <span className="text-sm">High</span>
                    <span className="font-bold text-primary">{alertCounts.high}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-aura-amber-muted">
                    <span className="text-sm">Medium</span>
                    <span className="font-bold text-aura-amber">{alertCounts.medium}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-aura-emerald-muted">
                    <span className="text-sm">Low</span>
                    <span className="font-bold text-aura-emerald">{alertCounts.low}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hotspot List */}
            <div className="space-y-2">
              {hotspots
                .sort((a, b) => {
                  const order = { critical: 0, high: 1, medium: 2, low: 3 }
                  return order[a.severity] - order[b.severity]
                })
                .map((hotspot) => (
                  <Card
                    key={hotspot.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => onLocationSelect(hotspot.location)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              hotspot.severity === "critical"
                                ? "bg-verdict-false animate-pulse"
                                : hotspot.severity === "high"
                                  ? "bg-primary"
                                  : hotspot.severity === "medium"
                                    ? "bg-aura-amber"
                                    : "bg-aura-emerald"
                            }`}
                          />
                          <span className="font-medium text-sm">{hotspot.location.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{hotspot.trendCount} trends</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{hotspot.topTrend}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
