"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, AlertTriangle, CheckCircle, Clock, BarChart3 } from "lucide-react"

const stats = [
  { label: "Total Alerts", value: "1,234", change: "+12%", trend: "up", icon: AlertTriangle },
  { label: "Resolved", value: "1,089", change: "+18%", trend: "up", icon: CheckCircle },
  { label: "Avg Response", value: "4.2 min", change: "-23%", trend: "down", icon: Clock },
  { label: "Users Reached", value: "45M", change: "+34%", trend: "up", icon: Users },
]

const categoryData = [
  { category: "Political", count: 423, percentage: 34 },
  { category: "Health", count: 312, percentage: 25 },
  { category: "Communal", count: 234, percentage: 19 },
  { category: "Financial", count: 156, percentage: 13 },
  { category: "Other", count: 109, percentage: 9 },
]

const topRegions = [
  { region: "Maharashtra", alerts: 156, resolved: 142 },
  { region: "Uttar Pradesh", alerts: 134, resolved: 121 },
  { region: "Delhi", alerts: 98, resolved: 95 },
  { region: "Karnataka", alerts: 87, resolved: 82 },
  { region: "Tamil Nadu", alerts: 76, resolved: 74 },
]

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Analytics</h1>
          <p className="text-muted-foreground">Performance metrics and insights</p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div
                  className={`flex items-center text-xs font-medium ${stat.trend === "up" ? "text-aura-emerald" : "text-verdict-false"}`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryData.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">{item.count} alerts</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Regions */}
        <Card>
          <CardHeader>
            <CardTitle>Top Regions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRegions.map((region, index) => (
                <div key={region.region} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground">{index + 1}</span>
                    <div>
                      <p className="font-medium">{region.region}</p>
                      <p className="text-xs text-muted-foreground">{region.alerts} alerts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-aura-emerald">{region.resolved} resolved</p>
                    <p className="text-xs text-muted-foreground">
                      {((region.resolved / region.alerts) * 100).toFixed(0)}% rate
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Interactive chart visualization</p>
              <p className="text-sm">Showing alert trends over time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
