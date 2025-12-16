"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe3D } from "@/components/landing/globe-3d"
import { Search, Globe, Zap, CheckCircle, Target, Languages } from "lucide-react"

const stats = [
  { value: "50K+", label: "Claims Verified", icon: CheckCircle },
  { value: "6 min", label: "Avg Response Time", icon: Zap },
  { value: "94%", label: "Accuracy Rate", icon: Target },
  { value: "200+", label: "Languages Supported", icon: Languages },
]

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Fighting Misinformation In Real-Time"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Overline Badge */}
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium animate-fade-in">
              <Zap className="h-4 w-4 mr-2 text-primary" />
              AI-Powered Real-Time Verification
            </Badge>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">{displayText}</span>
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                AURA uses autonomous AI agents to detect, verify, and counter misinformation within minutes — protecting
                citizens, journalists, and institutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/fact-check">
                <Button size="lg" className="rounded-full group">
                  <Search className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Check a Claim
                </Button>
              </Link>
              <Link href="/trends">
                <Button size="lg" variant="outline" className="rounded-full group bg-transparent">
                  <Globe className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Explore Trends
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold font-display">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - 3D Globe */}
          <div className="relative h-[500px] lg:h-[600px]">
            <Globe3D />
          </div>
        </div>
      </div>
    </section>
  )
}
