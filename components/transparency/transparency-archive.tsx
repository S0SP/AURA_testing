"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TransparencyGlobe } from "./transparency-globe"
import {
  Globe,
  List,
  Filter,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  ExternalLink,
  Clock,
  Eye,
  Share2,
} from "lucide-react"

// Misinformation data with global coordinates
const globalMisinfoData = [
  {
    id: "1",
    lat: 28.6139,
    lng: 77.209,
    city: "New Delhi",
    country: "India",
    claim: "5G towers spread COVID-19 virus through radio waves",
    verdict: "FALSE" as const,
    source: "WhatsApp",
    date: "2025-01-15",
    views: 452300,
    originalUrl: "https://twitter.com/example/status/123",
    summary: "Radio waves cannot transmit biological pathogens. COVID-19 spreads through respiratory droplets.",
    category: "Health",
    severity: "high",
  },
  {
    id: "2",
    lat: 40.7128,
    lng: -74.006,
    city: "New York",
    country: "USA",
    claim: "Vaccines contain microchips for government tracking",
    verdict: "FALSE" as const,
    source: "Facebook",
    date: "2025-01-14",
    views: 789000,
    originalUrl: "https://facebook.com/post/456",
    summary: "Vaccine needles are too small for microchips. No tracking technology exists in vaccines.",
    category: "Health",
    severity: "critical",
  },
  {
    id: "3",
    lat: 51.5074,
    lng: -0.1278,
    city: "London",
    country: "UK",
    claim: "Climate change is a hoax created by governments",
    verdict: "FALSE" as const,
    source: "Twitter",
    date: "2025-01-13",
    views: 1234000,
    originalUrl: "https://twitter.com/example/status/789",
    summary: "97% of climate scientists agree that climate change is real and human-caused.",
    category: "Environment",
    severity: "high",
  },
  {
    id: "4",
    lat: -23.5505,
    lng: -46.6333,
    city: "São Paulo",
    country: "Brazil",
    claim: "Drinking bleach cures viral infections",
    verdict: "FALSE" as const,
    source: "WhatsApp",
    date: "2025-01-12",
    views: 567000,
    originalUrl: "https://wa.me/message/abc",
    summary: "Bleach is highly toxic and causes severe internal damage. Never consume cleaning products.",
    category: "Health",
    severity: "critical",
  },
  {
    id: "5",
    lat: 35.6762,
    lng: 139.6503,
    city: "Tokyo",
    country: "Japan",
    claim: "AI will replace all human jobs within 2 years",
    verdict: "MISLEADING" as const,
    source: "News",
    date: "2025-01-11",
    views: 891000,
    originalUrl: "https://news.example.com/ai-jobs",
    summary: "While AI will transform many industries, complete job replacement is overstated.",
    category: "Technology",
    severity: "medium",
  },
  {
    id: "6",
    lat: 55.7558,
    lng: 37.6173,
    city: "Moscow",
    country: "Russia",
    claim: "Election results were manipulated by foreign hackers",
    verdict: "UNVERIFIABLE" as const,
    source: "Telegram",
    date: "2025-01-10",
    views: 2345000,
    originalUrl: "https://t.me/channel/post",
    summary: "No credible evidence found. Security agencies have not confirmed these claims.",
    category: "Political",
    severity: "high",
  },
  {
    id: "7",
    lat: -33.8688,
    lng: 151.2093,
    city: "Sydney",
    country: "Australia",
    claim: "Wildfire was started intentionally by environmental activists",
    verdict: "FALSE" as const,
    source: "Facebook",
    date: "2025-01-09",
    views: 678000,
    originalUrl: "https://facebook.com/post/xyz",
    summary: "Investigation confirmed natural causes. No evidence of intentional arson.",
    category: "Environment",
    severity: "medium",
  },
  {
    id: "8",
    lat: 19.076,
    lng: 72.8777,
    city: "Mumbai",
    country: "India",
    claim: "New cryptocurrency guarantees 1000% returns in one month",
    verdict: "FALSE" as const,
    source: "WhatsApp",
    date: "2025-01-08",
    views: 456000,
    originalUrl: "https://wa.me/message/def",
    summary: "This is a classic Ponzi scheme. No investment can guarantee such returns.",
    category: "Financial",
    severity: "high",
  },
  {
    id: "9",
    lat: 48.8566,
    lng: 2.3522,
    city: "Paris",
    country: "France",
    claim: "Eating organic food prevents all types of cancer",
    verdict: "MISLEADING" as const,
    source: "News",
    date: "2025-01-07",
    views: 345000,
    originalUrl: "https://news.example.com/organic",
    summary: "While healthy diet helps, no single food type can prevent all cancers.",
    category: "Health",
    severity: "medium",
  },
  {
    id: "10",
    lat: 39.9042,
    lng: 116.4074,
    city: "Beijing",
    country: "China",
    claim: "New virus strain escaped from research laboratory",
    verdict: "UNVERIFIABLE" as const,
    source: "Twitter",
    date: "2025-01-06",
    views: 3456000,
    originalUrl: "https://twitter.com/example/status/999",
    summary: "Multiple investigations ongoing. Origin remains under scientific investigation.",
    category: "Health",
    severity: "critical",
  },
]

const verdictConfig = {
  TRUE: { icon: CheckCircle, color: "text-verdict-true", bg: "bg-verdict-true/10" },
  FALSE: { icon: XCircle, color: "text-verdict-false", bg: "bg-verdict-false/10" },
  MISLEADING: { icon: AlertTriangle, color: "text-verdict-misleading", bg: "bg-verdict-misleading/10" },
  UNVERIFIABLE: { icon: HelpCircle, color: "text-verdict-unverified", bg: "bg-verdict-unverified/10" },
}

export function TransparencyArchive() {
  const [selectedPoint, setSelectedPoint] = useState<(typeof globalMisinfoData)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"globe" | "list">("globe")
  const [filter, setFilter] = useState<"all" | "FALSE" | "MISLEADING" | "UNVERIFIABLE">("all")

  const filteredData = filter === "all" ? globalMisinfoData : globalMisinfoData.filter((d) => d.verdict === filter)

  const stats = {
    total: globalMisinfoData.length,
    false: globalMisinfoData.filter((d) => d.verdict === "FALSE").length,
    misleading: globalMisinfoData.filter((d) => d.verdict === "MISLEADING").length,
    unverifiable: globalMisinfoData.filter((d) => d.verdict === "UNVERIFIABLE").length,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-primary/10">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Transparency Archive</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explore fact-checked claims on an interactive globe. Click on hotspots to see misinformation details, evidence
          chains, and verified sources.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Claims", value: stats.total, icon: TrendingUp, color: "text-primary" },
          { label: "False", value: stats.false, icon: XCircle, color: "text-verdict-false" },
          { label: "Misleading", value: stats.misleading, icon: AlertTriangle, color: "text-verdict-misleading" },
          { label: "Unverifiable", value: stats.unverifiable, icon: HelpCircle, color: "text-verdict-unverified" },
        ].map((stat, i) => (
          <Card
            key={stat.label}
            className="transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "globe" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("globe")}
            className="transition-all"
          >
            <Globe className="h-4 w-4 mr-2" />
            Globe View
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="bg-transparent transition-all"
          >
            <List className="h-4 w-4 mr-2" />
            List View
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1">
            {(["all", "FALSE", "MISLEADING", "UNVERIFIABLE"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(f)}
                className={`text-xs transition-all ${filter === f ? "" : "bg-transparent"}`}
              >
                {f === "all" ? "All" : f}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Globe / List View */}
        <div className="lg:col-span-2">
          {viewMode === "globe" ? (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[600px] bg-background">
                  <TransparencyGlobe
                    data={filteredData}
                    selectedPoint={selectedPoint}
                    onSelectPoint={setSelectedPoint}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="p-4 space-y-3">
                    {filteredData.map((item, index) => {
                      const config = verdictConfig[item.verdict]
                      const Icon = config.icon

                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedPoint(item)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 group
                            ${
                              selectedPoint?.id === item.id
                                ? "bg-primary/5 border-primary shadow-lg"
                                : "bg-secondary/30 hover:bg-secondary/50"
                            }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${config.bg} transition-transform group-hover:scale-110`}>
                              <Icon className={`h-5 w-5 ${config.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-muted-foreground">
                                  {item.city}, {item.country}
                                </span>
                                <Badge className={`${config.bg} ${config.color} text-xs`}>{item.verdict}</Badge>
                              </div>
                              <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                {item.claim}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                <span>{item.source}</span>
                                <span>{(item.views / 1000).toFixed(0)}K views</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:sticky lg:top-24 lg:h-[600px]">
          {selectedPoint ? (
            <Card className="h-full overflow-hidden animate-in slide-in-from-right-5 fade-in duration-300">
              <ScrollArea className="h-full">
                <CardContent className="p-6 space-y-6">
                  {/* Verdict Header */}
                  <div className={`p-4 rounded-xl ${verdictConfig[selectedPoint.verdict].bg}`}>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = verdictConfig[selectedPoint.verdict].icon
                        return <Icon className={`h-8 w-8 ${verdictConfig[selectedPoint.verdict].color}`} />
                      })()}
                      <div>
                        <p className={`text-xl font-bold ${verdictConfig[selectedPoint.verdict].color}`}>
                          {selectedPoint.verdict}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedPoint.city}, {selectedPoint.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Claim */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">CLAIM</h3>
                    <p className="font-medium">{selectedPoint.claim}</p>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">FACT CHECK</h3>
                    <p className="text-muted-foreground">{selectedPoint.summary}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{selectedPoint.category}</Badge>
                    <Badge variant="secondary">{selectedPoint.source}</Badge>
                    <Badge variant="outline" className="bg-transparent">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedPoint.date}
                    </Badge>
                    <Badge variant="outline" className="bg-transparent">
                      <Eye className="h-3 w-3 mr-1" />
                      {(selectedPoint.views / 1000).toFixed(0)}K
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Button className="w-full">View Full Report</Button>
                    <a href={selectedPoint.originalUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="outline" className="w-full bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Original Post
                      </Button>
                    </a>
                    <Button variant="ghost" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  {viewMode === "globe"
                    ? "Click on a pin on the globe to view details"
                    : "Select a claim from the list to view details"}
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
