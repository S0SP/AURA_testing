"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-card relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Ready to Fight Misinformation?</h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of citizens, journalists, and institutions using AURA to verify facts and protect truth.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/fact-check">
              <Button size="lg" className="rounded-full group">
                Start Fact-Checking
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                Contact Sales
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-6">Free for individuals. Enterprise plans available.</p>
        </motion.div>
      </div>
    </section>
  )
}
