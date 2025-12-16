"use client"

import { useState } from "react"
import { TrendGlobe } from "@/components/trends/trend-globe"
import { TrendSidebar } from "@/components/trends/trend-sidebar"
import { TrendDetails } from "@/components/trends/trend-details"
import { KnowledgeGraph } from "@/components/trends/knowledge-graph"

export interface Location {
  id: string
  name: string
  country: string
  lat: number
  lng: number
}

export interface Hotspot {
  id: string
  location: Location
  severity: "low" | "medium" | "high" | "critical"
  trendCount: number
  topTrend: string
}

export interface Trend {
  id: string
  hashtag: string
  volume: number
  sentiment: "positive" | "negative" | "neutral"
  riskLevel: "none" | "low" | "medium" | "high" | "critical"
  category: string
  samplePosts: {
    author: string
    content: string
    verdict?: string
    confidence?: number
  }[]
}

const mockHotspots: Hotspot[] = [
  {
    id: "1",
    location: { id: "mum", name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777 },
    severity: "high",
    trendCount: 12,
    topTrend: "#CovidVaccine5G",
  },
  {
    id: "2",
    location: { id: "del", name: "New Delhi", country: "India", lat: 28.6139, lng: 77.209 },
    severity: "critical",
    trendCount: 8,
    topTrend: "#Election2025",
  },
  {
    id: "3",
    location: { id: "sf", name: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194 },
    severity: "medium",
    trendCount: 5,
    topTrend: "#AITakeover",
  },
  {
    id: "4",
    location: { id: "lon", name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
    severity: "low",
    trendCount: 3,
    topTrend: "#BrexitLies",
  },
]

export function TrendExplorer() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null)
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false)

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Globe Section */}
        <div className="flex-1 relative">
          <TrendGlobe
            hotspots={mockHotspots}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />

          {/* Search Overlay */}
          <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80 z-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search city or country..."
                className="w-full px-4 py-3 rounded-xl bg-card/90 backdrop-blur-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 p-4 rounded-xl bg-card/90 backdrop-blur-xl border border-border hidden md:block">
            <h4 className="text-xs font-medium mb-2">Risk Level</h4>
            <div className="space-y-1">
              {[
                { level: "Critical", color: "bg-verdict-false" },
                { level: "High", color: "bg-primary" },
                { level: "Medium", color: "bg-verdict-misleading" },
                { level: "Low", color: "bg-aura-emerald" },
              ].map((item) => (
                <div key={item.level} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-xs text-muted-foreground">{item.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <TrendSidebar
          selectedLocation={selectedLocation}
          hotspots={mockHotspots}
          onTrendSelect={setSelectedTrend}
          onLocationSelect={setSelectedLocation}
        />
      </div>

      {/* Trend Details Panel */}
      {selectedTrend && (
        <TrendDetails
          trend={selectedTrend}
          onClose={() => setSelectedTrend(null)}
          onViewKnowledgeGraph={() => setShowKnowledgeGraph(true)}
        />
      )}

      {/* Knowledge Graph Modal */}
      {showKnowledgeGraph && <KnowledgeGraph onClose={() => setShowKnowledgeGraph(false)} />}
    </div>
  )
}
