"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, AlertTriangle, TrendingUp, ChevronRight } from "lucide-react"

const regions = [
  { id: "MH", name: "Maharashtra", alerts: 8, severity: "high" as const, trend: "+23%" },
  { id: "RJ", name: "Rajasthan", alerts: 5, severity: "critical" as const, trend: "+45%" },
  { id: "UP", name: "Uttar Pradesh", alerts: 12, severity: "medium" as const, trend: "+12%" },
  { id: "DL", name: "Delhi", alerts: 3, severity: "low" as const, trend: "-5%" },
  { id: "KA", name: "Karnataka", alerts: 4, severity: "medium" as const, trend: "+8%" },
  { id: "TN", name: "Tamil Nadu", alerts: 2, severity: "low" as const, trend: "+3%" },
  { id: "WB", name: "West Bengal", alerts: 6, severity: "high" as const, trend: "+18%" },
  { id: "GJ", name: "Gujarat", alerts: 3, severity: "medium" as const, trend: "+7%" },
]

const severityColors = {
  critical: { bg: "bg-verdict-false", text: "text-verdict-false", fill: "fill-verdict-false" },
  high: { bg: "bg-primary", text: "text-primary", fill: "fill-primary" },
  medium: { bg: "bg-aura-amber", text: "text-aura-amber", fill: "fill-aura-amber" },
  low: { bg: "bg-aura-emerald", text: "text-aura-emerald", fill: "fill-aura-emerald" },
}

export function RegionalMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const selected = regions.find((r) => r.id === selectedRegion)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Regional View</h1>
        <p className="text-muted-foreground">Monitor misinformation threats by region</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardContent className="h-full p-6 flex items-center justify-center">
              <div className="text-center">
                {/* SVG Map of India - Simplified */}
                <svg viewBox="0 0 400 450" className="w-full max-w-md h-auto">
                  {/* Background */}
                  <rect width="400" height="450" fill="transparent" />

                  {/* Simplified India outline with regions */}
                  {regions.map((region, index) => {
                    const x = 100 + (index % 3) * 80
                    const y = 100 + Math.floor(index / 3) * 100
                    const config = severityColors[region.severity]

                    return (
                      <g key={region.id}>
                        <circle
                          cx={x}
                          cy={y}
                          r={30 + region.alerts * 2}
                          className={`${config.fill} opacity-20 cursor-pointer transition-all hover:opacity-40`}
                          onClick={() => setSelectedRegion(region.id)}
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r={8}
                          className={`${config.fill} cursor-pointer`}
                          onClick={() => setSelectedRegion(region.id)}
                        />
                        <text
                          x={x}
                          y={y + 45}
                          textAnchor="middle"
                          className="fill-muted-foreground text-xs"
                          onClick={() => setSelectedRegion(region.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {region.name}
                        </text>
                      </g>
                    )
                  })}
                </svg>
                <p className="text-sm text-muted-foreground mt-4">Click on a region to view details</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Region Details */}
        <div className="space-y-6">
          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Threat Level</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(["critical", "high", "medium", "low"] as const).map((level) => (
                <div key={level} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${severityColors[level].bg}`} />
                  <span className="text-sm capitalize">{level}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Selected Region Info */}
          {selected ? (
            <Card className={`border-2 ${severityColors[selected.severity].bg.replace("bg-", "border-")}/30`}>
              <CardHeader className={`${severityColors[selected.severity].bg}/10`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {selected.name}
                  </CardTitle>
                  <Badge className={severityColors[selected.severity].bg}>{selected.severity.toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold">{selected.alerts}</p>
                    <p className="text-xs text-muted-foreground">Active Alerts</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <TrendingUp className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p
                      className={`text-lg font-bold ${selected.trend.startsWith("+") ? "text-verdict-false" : "text-aura-emerald"}`}
                    >
                      {selected.trend}
                    </p>
                    <p className="text-xs text-muted-foreground">Trend</p>
                  </div>
                </div>
                <Button className="w-full">
                  View Region Details <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                Select a region on the map to view details
              </CardContent>
            </Card>
          )}

          {/* Region List */}
          <Card>
            <CardHeader>
              <CardTitle>All Regions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-64">
                <div className="p-4 space-y-2">
                  {regions
                    .sort((a, b) => {
                      const order = { critical: 0, high: 1, medium: 2, low: 3 }
                      return order[a.severity] - order[b.severity]
                    })
                    .map((region) => (
                      <div
                        key={region.id}
                        onClick={() => setSelectedRegion(region.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                          selectedRegion === region.id ? "bg-primary/10" : "bg-secondary/30 hover:bg-secondary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${severityColors[region.severity].bg}`} />
                          <span className="text-sm font-medium">{region.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{region.alerts} alerts</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
