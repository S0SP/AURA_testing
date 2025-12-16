"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Users, Clock, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { GovView } from "./government-dashboard"

const stats = [
  {
    label: "Active Alerts",
    value: "23",
    change: "+5",
    trend: "up",
    icon: AlertTriangle,
    color: "text-verdict-false",
    bgColor: "bg-verdict-false/10",
  },
  {
    label: "Trends Monitored",
    value: "156",
    change: "+12",
    trend: "up",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Users Reached",
    value: "2.4M",
    change: "+18%",
    trend: "up",
    icon: Users,
    color: "text-aura-emerald",
    bgColor: "bg-aura-emerald-muted",
  },
  {
    label: "Avg Response Time",
    value: "4.2 min",
    change: "-1.3",
    trend: "down",
    icon: Clock,
    color: "text-aura-amber",
    bgColor: "bg-aura-amber-muted",
  },
]

const priorityAlerts = [
  {
    id: 1,
    severity: "critical" as const,
    title: "Communal tension in Rajasthan",
    description: "Viral posts inciting violence between communities. Immediate action required.",
    reach: "45K",
    time: "2 min ago",
  },
  {
    id: 2,
    severity: "high" as const,
    title: "Election misinformation in Maharashtra",
    description: "False claims about EVM tampering spreading rapidly.",
    reach: "128K",
    time: "15 min ago",
  },
  {
    id: 3,
    severity: "medium" as const,
    title: "Health misinformation - vaccines",
    description: "Anti-vaccine content gaining traction in rural areas.",
    reach: "23K",
    time: "1 hour ago",
  },
]

const severityConfig = {
  critical: {
    color: "text-verdict-false",
    bg: "bg-verdict-false/10",
    border: "border-verdict-false/30",
    badge: "bg-verdict-false text-white",
  },
  high: {
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    badge: "bg-primary text-primary-foreground",
  },
  medium: {
    color: "text-aura-amber",
    bg: "bg-aura-amber-muted",
    border: "border-aura-amber/30",
    badge: "bg-aura-amber text-background",
  },
  low: {
    color: "text-aura-emerald",
    bg: "bg-aura-emerald-muted",
    border: "border-aura-emerald/30",
    badge: "bg-aura-emerald text-background",
  },
}

interface DashboardOverviewProps {
  onViewChange: (view: GovView) => void
}

export function DashboardOverview({ onViewChange }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor and respond to misinformation threats</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center text-xs font-medium ${stat.trend === "up" ? "text-aura-emerald" : "text-verdict-false"}`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Threat Level Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Threat Level Overview</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onViewChange("alerts")} className="bg-transparent">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            {[
              { level: "Critical", count: 2, color: "bg-verdict-false" },
              { level: "High", count: 7, color: "bg-primary" },
              { level: "Medium", count: 23, color: "bg-aura-amber" },
              { level: "Low", count: 45, color: "bg-aura-emerald" },
            ].map((item) => (
              <div key={item.level} className="flex-1 p-4 rounded-xl bg-secondary/50 text-center">
                <div className={`w-3 h-3 rounded-full ${item.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-xs text-muted-foreground">{item.level}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Priority Alerts</CardTitle>
          <Badge variant="secondary" className="bg-verdict-false/10 text-verdict-false">
            {priorityAlerts.length} Pending
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {priorityAlerts.map((alert) => {
            const config = severityConfig[alert.severity]
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border ${config.bg} ${config.border} cursor-pointer hover:scale-[1.01] transition-transform`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={config.badge}>{alert.severity.toUpperCase()}</Badge>
                    <span className="font-medium">{alert.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Reach: {alert.reach}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      View
                    </Button>
                    <Button size="sm">Respond</Button>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
