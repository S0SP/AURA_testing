"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  AlertTriangle,
  FileEdit,
  Map,
  Radio,
  BarChart3,
  Settings,
  Phone,
  ShieldCheck,
} from "lucide-react"
import type { GovView } from "./government-dashboard"

const navItems = [
  { id: "dashboard" as GovView, label: "Dashboard", icon: LayoutDashboard },
  { id: "alerts" as GovView, label: "Active Alerts", icon: AlertTriangle },
  { id: "regional" as GovView, label: "Regional View", icon: Map },
  { id: "clarifications" as GovView, label: "Clarifications", icon: FileEdit },
  { id: "spread" as GovView, label: "Spread Control", icon: Radio },
  { id: "analytics" as GovView, label: "Analytics", icon: BarChart3 },
]

interface GovSidebarProps {
  activeView: GovView
  onViewChange: (view: GovView) => void
  isOpen: boolean
}

export function GovSidebar({ activeView, onViewChange, isOpen }: GovSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 w-64 border-r border-border bg-card transition-transform duration-300 z-40",
        !isOpen && "-translate-x-full",
      )}
    >
      <div className="flex flex-col h-full p-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start", activeView === item.id && "bg-primary/10 text-primary")}
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <hr className="border-border" />

          <Button variant="ghost" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>

          <div className="p-3 rounded-lg bg-aura-emerald-muted border border-aura-emerald/30">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-aura-emerald" />
              <span className="text-sm font-medium">Secure Mode</span>
            </div>
            <p className="text-xs text-muted-foreground">All actions are logged and encrypted</p>
          </div>

          <div className="p-3 rounded-lg bg-verdict-false/10 border border-verdict-false/30">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-verdict-false" />
              <span className="text-sm font-medium">Emergency Line</span>
            </div>
            <p className="text-xs text-muted-foreground">1800-XXX-XXXX (24/7)</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
