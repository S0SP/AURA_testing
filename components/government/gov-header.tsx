"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Shield, Menu, Bell, User, Settings, LogOut, Lock } from "lucide-react"

interface GovHeaderProps {
  onToggleSidebar: () => void
}

export function GovHeader({ onToggleSidebar }: GovHeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-card/95 backdrop-blur">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <span className="font-display text-xl font-bold">AURA</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                Government
              </Badge>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 bg-transparent">
            <Lock className="h-3 w-3" />
            Secure Mode
          </Badge>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-verdict-false rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h4 className="font-semibold mb-2">Notifications</h4>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-verdict-false/10 text-sm">
                    <p className="font-medium text-verdict-false">Critical Alert</p>
                    <p className="text-muted-foreground text-xs">Communal tension detected in Rajasthan</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary text-sm">
                    <p className="font-medium">New assignment</p>
                    <p className="text-muted-foreground text-xs">3 alerts assigned to you</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">National Administrator</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-verdict-false">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
