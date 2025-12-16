"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Upload, Brain, Database, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Submit Claim",
    description: "Paste a link, forward a message, or type a claim you want verified",
    icon: Upload,
    color: "from-primary to-primary/50",
  },
  {
    number: "02",
    title: "AI Agents Analyze",
    description: "Multi-agent debate system with Advocate, Skeptic, and Judge evaluates evidence",
    icon: Brain,
    color: "from-accent to-accent/50",
  },
  {
    number: "03",
    title: "Knowledge Retrieval",
    description: "Search WHO, CDC, Reuters & 500+ scientific databases for verification",
    icon: Database,
    color: "from-aura-amber to-aura-amber/50",
  },
  {
    number: "04",
    title: "Verdict Delivered",
    description: "Get verdict with confidence score, sources, and AI-generated explanation",
    icon: CheckCircle,
    color: "from-aura-emerald to-aura-emerald/50",
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">How AURA Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From submission to verdict in under 6 minutes
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-aura-emerald hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <div
                    className={`text-5xl font-display font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-2`}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>

              {/* Icon */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                >
                  <step.icon className="h-8 w-8 text-background" />
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
