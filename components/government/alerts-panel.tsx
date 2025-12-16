"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Filter,
  MapPin,
  TrendingUp,
  Users,
  Clock,
  Eye,
  MessageSquare,
  ArrowUp,
  CheckCircle,
} from "lucide-react"

interface Alert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  category: string
  location: string
  reach: number
  velocity: number
  timestamp: string
  status: "new" | "reviewing" | "responded" | "resolved"
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    severity: "critical",
    title: "Communal tension posts in Jaipur",
    description: "Multiple viral posts inciting violence between Hindu and Muslim communities",
    category: "communal",
    location: "Rajasthan",
    reach: 45000,
    velocity: 234,
    timestamp: "2 min ago",
    status: "new",
  },
  {
    id: "2",
    severity: "high",
    title: "EVM tampering claims",
    description: "Coordinated campaign claiming EVMs are rigged in Maharashtra",
    category: "political",
    location: "Maharashtra",
    reach: 128000,
    velocity: 567,
    timestamp: "15 min ago",
    status: "reviewing",
  },
  {
    id: "3",
    severity: "high",
    title: "Fake government scheme",
    description: "Fraudulent posts about free electricity scheme asking for bank details",
    category: "financial",
    location: "Uttar Pradesh",
    reach: 67000,
    velocity: 189,
    timestamp: "45 min ago",
    status: "new",
  },
  {
    id: "4",
    severity: "medium",
    title: "Vaccine side effects misinformation",
    description: "Claims about severe vaccine side effects spreading in rural areas",
    category: "health",
    location: "Bihar",
    reach: 23000,
    velocity: 78,
    timestamp: "1 hour ago",
    status: "responded",
  },
]

const severityConfig = {
  critical: { color: "text-verdict-false", bg: "bg-verdict-false/10", badge: "bg-verdict-false" },
  high: { color: "text-primary", bg: "bg-primary/10", badge: "bg-primary" },
  medium: { color: "text-aura-amber", bg: "bg-aura-amber-muted", badge: "bg-aura-amber" },
  low: { color: "text-aura-emerald", bg: "bg-aura-emerald-muted", badge: "bg-aura-emerald" },
}

const categoryIcons: Record<string, string> = {
  communal: "🕌",
  political: "🏛️",
  health: "🏥",
  financial: "💰",
  celebrity: "⭐",
  disaster: "🌊",
}

const statusConfig = {
  new: { label: "New", color: "bg-verdict-false/10 text-verdict-false" },
  reviewing: { label: "Reviewing", color: "bg-aura-amber-muted text-aura-amber" },
  responded: { label: "Responded", color: "bg-primary/10 text-primary" },
  resolved: { label: "Resolved", color: "bg-aura-emerald-muted text-aura-emerald" },
}

export function AlertsPanel() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [filter, setFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Active Alerts</h1>
          <p className="text-muted-foreground">Monitor and respond to misinformation threats</p>
        </div>
        <Badge variant="secondary" className="bg-verdict-false/10 text-verdict-false">
          {mockAlerts.filter((a) => a.status === "new").length} Pending
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search alerts..." className="pl-10" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="communal">Communal</SelectItem>
            <SelectItem value="political">Political</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alerts List */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts Queue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="p-4 space-y-3">
                {mockAlerts.map((alert) => {
                  const config = severityConfig[alert.severity]
                  return (
                    <div
                      key={alert.id}
                      onClick={() => setSelectedAlert(alert)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedAlert?.id === alert.id
                          ? `${config.bg} border-primary`
                          : "bg-secondary/30 hover:bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span>{categoryIcons[alert.category]}</span>
                          <Badge className={`${config.badge} text-white`}>{alert.severity.toUpperCase()}</Badge>
                        </div>
                        <Badge variant="secondary" className={statusConfig[alert.status].color}>
                          {statusConfig[alert.status].label}
                        </Badge>
                      </div>
                      <h3 className="font-medium mb-1">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {(alert.reach / 1000).toFixed(0)}K reach
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {alert.timestamp}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Alert Detail */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAlert ? (
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{categoryIcons[selectedAlert.category]}</span>
                    <Badge className={`${severityConfig[selectedAlert.severity].badge} text-white`}>
                      {selectedAlert.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="secondary" className={statusConfig[selectedAlert.status].color}>
                      {statusConfig[selectedAlert.status].label}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{selectedAlert.title}</h2>
                  <p className="text-muted-foreground">{selectedAlert.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold">{(selectedAlert.reach / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">Reach</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <TrendingUp className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold">{selectedAlert.velocity}/hr</p>
                    <p className="text-xs text-muted-foreground">Velocity</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <MapPin className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-lg font-bold">{selectedAlert.location}</p>
                    <p className="text-xs text-muted-foreground">Region</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Issue Response
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Sources
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <ArrowUp className="h-4 w-4 mr-2" />
                    Escalate
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent text-aura-emerald">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Resolved
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                Select an alert to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
