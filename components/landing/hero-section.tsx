"use client"

import { useEffect, useState, useRef } from "react"
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

// Floating particles for unified background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string
    }> = []

    const colors = ["#f97316", "#22c55e", "#f59e0b", "#3b82f6", "#8b5cf6"]

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Pulsing opacity
        particle.opacity = 0.2 + Math.sin(Date.now() * 0.001 + particle.x) * 0.15

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

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

      {/* Unified Particle Background */}
      <ParticleBackground />

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
