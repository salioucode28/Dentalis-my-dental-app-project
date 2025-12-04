"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Sparkles } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#services", label: "Soins" },
    { href: "#about", label: "Le cabinet" },
    { href: "#team", label: "L'équipe" },
    { href: "#contact", label: "Accès" },
  ]

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex justify-center py-3 pointer-events-none">
      <div className="container px-4 flex justify-center">
        <div className="glass-panel pointer-events-auto flex w-full max-w-5xl items-center gap-4 px-4 py-2 md:px-6 md:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-2xl bg-primary shadow-md">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
              <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/30/40" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-base font-semibold tracking-tight">Dentalis</span>
              <span className="text-[10px] font-medium uppercase text-muted-foreground tracking-[0.2em] hidden sm:block">
                Cabinet dentaire
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="absolute inset-0 scale-0 rounded-full bg-slate-200 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
                  <span className="relative">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              asChild
              size="sm"
              className="rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <a href="#booking" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Planifier</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground shadow-sm transition-colors hover:bg-accent/10 md:hidden"
            aria-label="Basculer le menu"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-0 top-16 z-40 md:hidden">
          <div className="mx-4 rounded-3xl border border-border/80 bg-background/95 px-4 py-4 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl px-3 py-2 text-sm font-medium text-foreground/90 transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3">
                <Button
                  asChild
                  size="sm"
                  className="flex-1 rounded-full bg-primary text-primary-foreground shadow-md"
                >
                  <a href="#booking" className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Réserver un créneau</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
