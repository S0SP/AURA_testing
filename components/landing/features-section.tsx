"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Globe, Building2, Database, MessageSquare, BarChart3, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Instant Fact-Check",
    description:
      "Verify claims in seconds using multi-agent AI debate system that evaluates evidence from trusted sources.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Globe,
    title: "Global Trends",
    description: "Track misinformation hotspots worldwide with real-time visualization of emerging narratives.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Building2,
    title: "Government Portal",
    description: "Official response system for authorities to issue clarifications and counter false narratives.",
    color: "text-aura-emerald",
    bgColor: "bg-aura-emerald-muted",
  },
  {
    icon: Database,
    title: "Knowledge Graph",
    description: "Visual evidence chain for every fact-check with interactive 3D relationship mapping.",
    color: "text-aura-amber",
    bgColor: "bg-aura-amber-muted",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Bot",
    description: "Forward suspicious messages to our bot and get instant verification in your language.",
    color: "text-aura-emerald",
    bgColor: "bg-aura-emerald-muted",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Deep insights into misinformation patterns, spread velocity, and intervention effectiveness.",
    color: "text-aura-rose",
    bgColor: "bg-aura-rose-muted",
  },
  {
    icon: Shield,
    title: "Source Verification",
    description: "Cross-reference with WHO, CDC, Reuters, and 500+ authoritative databases.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Real-Time Alerts",
    description: "Get notified instantly when viral misinformation matches topics you care about.",
    color: "text-aura-amber",
    bgColor: "bg-aura-amber-muted",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to fight misinformation at scale
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
