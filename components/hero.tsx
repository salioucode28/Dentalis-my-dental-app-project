"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, BadgeCheck, CalendarClock, Clock3, HeartHandshake, MessageCircle, PhoneCall, ShieldCheck, Sparkles, Star, Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CLINIC_CONFIG } from "@/lib/config"

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    label: "Confort assuré",
  },
  {
    icon: CalendarClock,
    label: "Horaires flexibles",
  },
  {
    icon: HeartHandshake,
    label: "Suivi attentionné",
  },
]

const INFO_CARDS = [
  {
    title: "Contactez-nous",
    description: "(217) 870-2104",
    cta: "Appeler",
    href: "tel:+2178702104",
    icon: PhoneCall,
  },
  {
    title: "Horaires",
    description: "Lun - Ven · 8h00 - 18h00",
    cta: "Voir détails",
    href: "#contact",
    icon: Clock3,
  },
  {
    title: "Nos services",
    description: "Prévention, esthétique & urgences",
    cta: "Découvrir",
    href: "#services",
    icon: Sparkles,
  },
]

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="accueil" className="relative overflow-hidden bg-slate-50 px-4 pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden h-full w-[36rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl md:block" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div
          className={`relative transition-all duration-700 order-first md:order-last ${
            isVisible ? "opacity-100 delay-150" : "-translate-y-12 opacity-0"
          }`}
        >
          <img
            src="/assets/herodentist.png"
            alt="Dr souriante accueillant les patients"
            className="h-full max-h-[350px] sm:max-h-[400px] lg:max-h-[450px] w-full object-contain object-center"
            draggable={false}
          />
        </div>

        <div
          className={`relative flex flex-col gap-7 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="space-y-4">
            <h1 className="text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.6rem]">
              A dental clinic you can trust.
            </h1>
            <p className="max-w-full text-balance text-sm text-muted-foreground sm:text-base md:text-lg">
              Retrouvez des soins de pointe, des praticiens à l’écoute et une ambiance lumineuse pensée pour apaiser
              toute la famille. Chaque visite commence par votre confort.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#25D366] px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base text-white shadow-lg hover:bg-[#1EB858] w-full sm:w-auto"
            >
              <a href={`https://wa.me/${CLINIC_CONFIG.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Réserver sur WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-border/80 px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base w-full sm:w-auto">
              <Link href="#services">Découvrir nos soins</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 rounded-[1.75rem] border border-border/70 bg-card/80 p-5">
            <div className="flex flex-1 min-w-[180px] items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">4,9/5</p>
                <p className="text-xs text-muted-foreground">Avis patients</p>
              </div>
            </div>
            <div className="flex flex-1 min-w-[180px] items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <PhoneCall className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">+2 500</p>
                <p className="text-xs text-muted-foreground">Familles suivies</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <div key={label} className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-white/70 px-4 py-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
        {INFO_CARDS.map(({ title, description, cta, href, icon: Icon }) => (
          <div key={title} className="card-spotlight group bg-card/95 p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">{title}</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{description}</p>
            <Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
              {cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

    </section>
  )
}

