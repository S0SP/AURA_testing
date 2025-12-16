import Link from "next/link"
import { Shield, Twitter, Github, Linkedin } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Fact-Check", href: "/fact-check" },
    { label: "Trend Explorer", href: "/trends" },
    { label: "Knowledge Graph", href: "/knowledge-graph" },
    { label: "API Access", href: "/api" },
  ],
  solutions: [
    { label: "For Citizens", href: "/citizens" },
    { label: "For Journalists", href: "/journalists" },
    { label: "For Government", href: "/government" },
    { label: "For Enterprises", href: "/enterprise" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Research Papers", href: "/research" },
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press Kit", href: "/press" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/aura_verify", label: "Twitter" },
  { icon: Github, href: "https://github.com/aura", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/aura", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-display text-xl font-bold">AURA</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Fighting misinformation with AI-powered fact verification.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AURA. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
