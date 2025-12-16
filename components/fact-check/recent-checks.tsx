"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, HelpCircle, Clock } from "lucide-react"

const recentChecks = [
  {
    id: 1,
    claim: "Drinking warm water with lemon cures COVID-19",
    verdict: "FALSE" as const,
    time: "2 min ago",
  },
  {
    id: 2,
    claim: "WHO recommends wearing masks in crowded places",
    verdict: "TRUE" as const,
    time: "15 min ago",
  },
  {
    id: 3,
    claim: "New study shows coffee prevents cancer",
    verdict: "MISLEADING" as const,
    time: "1 hour ago",
  },
  {
    id: 4,
    claim: "Government announces free electricity scheme",
    verdict: "UNVERIFIABLE" as const,
    time: "2 hours ago",
  },
  {
    id: 5,
    claim: "Heavy rainfall expected in Mumbai next week",
    verdict: "TRUE" as const,
    time: "3 hours ago",
  },
]

const verdictIcons = {
  TRUE: { icon: CheckCircle, color: "text-verdict-true", bg: "bg-verdict-true/10" },
  FALSE: { icon: XCircle, color: "text-verdict-false", bg: "bg-verdict-false/10" },
  MISLEADING: { icon: AlertTriangle, color: "text-verdict-misleading", bg: "bg-verdict-misleading/10" },
  UNVERIFIABLE: { icon: HelpCircle, color: "text-verdict-unverified", bg: "bg-verdict-unverified/10" },
}

export function RecentChecks() {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Checks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentChecks.map((check) => {
          const config = verdictIcons[check.verdict]
          const Icon = config.icon

          return (
            <div
              key={check.id}
              className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-2 mb-1">{check.claim}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={`text-xs ${config.bg} ${config.color}`}>
                      {check.verdict}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{check.time}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <button className="w-full text-sm text-primary hover:underline pt-2">View all checks in Archive</button>
      </CardContent>
    </Card>
  )
}
