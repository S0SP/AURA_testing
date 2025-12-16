"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { label: "Home", href: "/" },
  { label: "Fact-Check", href: "/fact-check" },
  { label: "Trends", href: "/trends" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "h-16 bg-background/80 backdrop-blur-xl border-b border-border" : "h-18 bg-transparent",
      )}
    >
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary transition-all group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight">AURA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <Link href="/government" className="hidden sm:block">
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              Government Portal
            </Button>
          </Link>

          <Link href="/fact-check" className="hidden sm:block">
            <Button size="sm" className="rounded-full">
              Start Checking
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-2 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-lg font-medium hover:bg-secondary rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <hr className="my-4 border-border" />
                <Link href="/government">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Government Portal
                  </Button>
                </Link>
                <Link href="/fact-check">
                  <Button className="w-full justify-start">Start Checking</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
