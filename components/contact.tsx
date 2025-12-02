"use client"

import { Calendar, Sparkle, ArrowRight, MapPin } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import ContactButtons from "@/components/contact-buttons"
import { CLINIC_CONFIG } from "@/lib/config"

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-50 px-4 py-16 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 sm:gap-10 md:flex-row md:items-center">
        <ScrollReveal>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <Sparkle className="h-3 w-3 text-primary" />
              <span>Rendez-vous</span>
            </div>
            <h2 className="text-balance font-serif text-2xl text-foreground sm:text-3xl md:text-4xl lg:text-[2.6rem]">
              Prêt à faire du bien à votre sourire&nbsp;?
            </h2>
            <p className="mx-auto max-w-none text-balance text-xs text-muted-foreground sm:text-sm md:max-w-xl md:text-base">
              Choisissez votre créneau, nous nous chargeons du reste. Confirmation rapide, rappels automatiques et équipe à
              l’écoute avant, pendant et après votre visite.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-muted-foreground md:justify-start">
              <span className="rounded-full bg-background/70 px-3 py-1">Nouveaux patients bienvenus</span>
              <span className="rounded-full bg-background/70 px-3 py-1">Rappel SMS & email</span>
              <span className="rounded-full bg-background/70 px-3 py-1">Annulation souple jusqu’à J‑1</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="flex-1">
            <div className="glass-panel relative overflow-hidden p-6 md:p-7">
              <div className="absolute inset-0 bg-slate-100" />
              <div className="relative space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      Réservation express
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Appelez-nous ou envoyez un message WhatsApp : on vous répond en quelques minutes et on confirme votre créneau.
                    </p>
                  </div>
                </div>

                <ContactButtons className="mt-2" />

                <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-white/80 p-4 text-sm text-muted-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/90">Notre adresse</p>
                    <a
                      href={CLINIC_CONFIG.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      {CLINIC_CONFIG.address}
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl bg-background/80 p-4 text-xs text-muted-foreground">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/90">
                      Besoin de voir les horaires&nbsp;?
                    </p>
                    <p>Consultez notre planning détaillé et adaptez votre visite à votre journée.</p>
                  </div>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary hover:bg-primary/15"
                  >
                    Voir les horaires
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
