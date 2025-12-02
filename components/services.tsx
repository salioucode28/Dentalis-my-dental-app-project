"use client"

import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"
import { Baby, Shield, Sparkles, Smile, Stethoscope, Zap, Calendar } from "lucide-react"

const HIGHLIGHTS = [
  {
    title: "Blanchiment lumineux",
    description: "Techniques professionnelles douces pour réveiller l’éclat naturel de vos dents.",
    icon: Sparkles,
    href: "/services/blanchiment",
  },
  {
    title: "Prévention & suivi",
    description: "Contrôles réguliers, parodonte apaisée et conseils sur mesure.",
    icon: Shield,
    href: "/services/prevention",
  },
  {
    title: "Esthétique du sourire",
    description: "Facettes minimalistes, alignement discret et retouches invisibles.",
    icon: Smile,
    href: "/services/esthetique",
  },
  {
    title: "Soins généraux",
    description: "Plombages invisibles, couronnes, traitements de racine réalisés en douceur.",
    icon: Stethoscope,
    href: "/services/generale",
  },
  {
    title: "Dentisterie enfant",
    description: "Approche ludique et rassurante pour installer de bonnes habitudes tôt.",
    icon: Baby,
    href: "/services/enfant",
  },
  {
    title: "Urgences dentaires",
    description: "Créneaux rapides, protocole anti-douleur et suivi post-soin.",
    icon: Zap,
    href: "/services/urgence",
  },
]

const FAQ_ENTRIES = [
  {
    question: "Combien de séances sont nécessaires pour un blanchiment professionnel ?",
    answer:
      "Nous planifions généralement deux rendez-vous : préparation et séance lumineuse, puis contrôle sous 10 jours pour ajuster selon votre sensibilité.",
  },
  {
    question: "Puis-je regrouper plusieurs soins lors d’une même visite ?",
    answer:
      "Oui, nous combinons prévention et esthétique sur des créneaux de 45 minutes en respectant votre confort et les priorités médicales.",
  },
  {
    question: "Comment se passent les urgences dentaires ?",
    answer:
      "Appelez-nous ou écrivez sur WhatsApp : nous vous donnons un créneau sous 24h avec protocole anti-douleur et suivi digital.",
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 px-4 py-16 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <ScrollReveal>
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              <Sparkles className="h-3 w-3" />
              Soins essentiels
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-serif text-foreground sm:text-3xl md:text-4xl">Un rendez-vous, trois axes clés</h2>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  Prévention, esthétique, confort. On va à l’essentiel avec une équipe douce et disponible, inspirée de notre section rendez-vous.
                </p>
              </div>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm font-semibold text-white shadow-md w-full sm:w-auto justify-center"
              >
                <Calendar className="h-4 w-4" />
                Planifier un soin
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {HIGHLIGHTS.map(({ title, description, icon: Icon, href }) => (
              <div key={title} className="space-y-3 border-t border-border/60 pt-6 px-2 sm:px-0 md:border-l md:border-t-0 md:pl-6 first:border-0 first:pl-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-serif text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
                <Link href={href ?? "#contact"} className="inline-flex items-center text-sm font-semibold text-primary">
                  En savoir plus →
                </Link>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
