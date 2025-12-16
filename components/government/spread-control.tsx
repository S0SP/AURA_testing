"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Zap,
  Clock,
  Target,
  Users,
  Twitter,
  MessageCircle,
  Facebook,
  Newspaper,
  CheckCircle,
  Loader2,
} from "lucide-react"

const spreadStrategies = [
  {
    id: "immediate",
    name: "Immediate Blast",
    description: "Publish to all channels simultaneously",
    icon: Zap,
    duration: "Instant",
  },
  {
    id: "cascading",
    name: "Cascading Release",
    description: "Twitter → WhatsApp → Facebook (15 min intervals)",
    icon: Clock,
    duration: "45 min",
  },
  {
    id: "targeted",
    name: "Regional Targeting",
    description: "Focus on affected geographic area",
    icon: Target,
    duration: "Variable",
  },
  {
    id: "influencer",
    name: "Influencer Network",
    description: "Notify verified influencer network",
    icon: Users,
    duration: "1-2 hours",
  },
]

const recentCampaigns = [
  {
    id: "1",
    title: "EVM Security Clarification",
    status: "completed" as const,
    reach: 2400000,
    platforms: ["twitter", "whatsapp", "facebook"],
    time: "2 hours ago",
  },
  {
    id: "2",
    title: "Vaccine Safety Update",
    status: "active" as const,
    reach: 890000,
    progress: 67,
    platforms: ["twitter", "whatsapp"],
    time: "In progress",
  },
  {
    id: "3",
    title: "Flood Alert Response",
    status: "scheduled" as const,
    reach: 0,
    platforms: ["sms", "whatsapp"],
    time: "In 30 min",
  },
]

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  twitter: Twitter,
  whatsapp: MessageCircle,
  facebook: Facebook,
  press: Newspaper,
}

export function SpreadControl() {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Spread Control</h1>
        <p className="text-muted-foreground">Manage one-click spread campaigns for official responses</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Spread Strategies */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spread Strategies</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {spreadStrategies.map((strategy) => (
                <div
                  key={strategy.id}
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedStrategy === strategy.id
                      ? "bg-primary/10 border-primary"
                      : "bg-secondary/30 hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${selectedStrategy === strategy.id ? "bg-primary/20" : "bg-secondary"}`}
                    >
                      <strategy.icon className={`h-5 w-5 ${selectedStrategy === strategy.id ? "text-primary" : ""}`} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{strategy.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{strategy.description}</p>
                      <Badge variant="secondary">{strategy.duration}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Campaign */}
          {recentCampaigns.find((c) => c.status === "active") && (
            <Card className="border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    Active Campaign
                  </CardTitle>
                  <Badge className="bg-primary">In Progress</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const campaign = recentCampaigns.find((c) => c.status === "active")!
                  return (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.title}</h3>
                        <p className="text-sm text-muted-foreground">Spreading across platforms...</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{(campaign.reach / 1000000).toFixed(1)}M reached</span>
                        </div>
                        <div className="flex gap-1">
                          {campaign.platforms.map((p) => {
                            const Icon = platformIcons[p]
                            return Icon ? <Icon key={p} className="h-4 w-4 text-muted-foreground" /> : null
                          })}
                        </div>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Live Dashboard
                      </Button>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="p-4 space-y-3">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 rounded-xl bg-secondary/30">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{campaign.title}</h4>
                      <Badge
                        variant="secondary"
                        className={
                          campaign.status === "completed"
                            ? "bg-aura-emerald-muted text-aura-emerald"
                            : campaign.status === "active"
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary"
                        }
                      >
                        {campaign.status === "completed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : campaign.status === "active" ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {campaign.reach > 0 ? `${(campaign.reach / 1000000).toFixed(1)}M reached` : "Pending"}
                      </span>
                      <span>{campaign.time}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {campaign.platforms.map((p) => {
                        const Icon = platformIcons[p]
                        return Icon ? <Icon key={p} className="h-4 w-4 text-muted-foreground" /> : null
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
