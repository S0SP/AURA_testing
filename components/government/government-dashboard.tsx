"use client"

import { useState } from "react"
import { GovHeader } from "@/components/government/gov-header"
import { GovSidebar } from "@/components/government/gov-sidebar"
import { DashboardOverview } from "@/components/government/dashboard-overview"
import { AlertsPanel } from "@/components/government/alerts-panel"
import { ClarificationComposer } from "@/components/government/clarification-composer"
import { RegionalMap } from "@/components/government/regional-map"
import { SpreadControl } from "@/components/government/spread-control"
import { AnalyticsView } from "@/components/government/analytics-view"

export type GovView = "dashboard" | "alerts" | "clarifications" | "regional" | "spread" | "analytics"

export function GovernmentDashboard() {
  const [activeView, setActiveView] = useState<GovView>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview onViewChange={setActiveView} />
      case "alerts":
        return <AlertsPanel />
      case "clarifications":
        return <ClarificationComposer />
      case "regional":
        return <RegionalMap />
      case "spread":
        return <SpreadControl />
      case "analytics":
        return <AnalyticsView />
      default:
        return <DashboardOverview onViewChange={setActiveView} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <GovHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <GovSidebar activeView={activeView} onViewChange={setActiveView} isOpen={sidebarOpen} />

        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
