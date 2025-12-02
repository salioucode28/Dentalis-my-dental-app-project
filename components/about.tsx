"use client"

import { useEffect, useMemo, useState } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { Award, Heart, Users } from "lucide-react"

const LEAD_DOCTOR = {
  name: "Dr Sarah Johnson, DDS",
  role: "Dentiste principale",
  description:
    "15 ans de pratique en dentisterie esthétique et familiale. Sarah privilégie des rendez-vous longs, pédagogiques et calmes pour que chacun comprenne ses options.",
  focusPoints: ["Smile design & facettes", "Prévention personnalisée", "Accompagnement des familles"],
  imagePrimary: "/assets/femaledentist.jpg",
  imageSecondary: "/assets/hero3.jpg",
}

export default function About() {
  const [index, setIndex] = useState(0)
  const images = useMemo(() => ["/assets/hero2.jpg"], [])

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 3500)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <section id="about" className="bg-slate-50 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground">
                Bienvenue chez Dentalis Studio
              </h2>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Un cabinet pensé comme un espace de calme : lumière douce, sons apaisants, gestes précis. 
                Chaque visite doit être aussi confortable que possible, pour vous comme pour votre famille.
              </p>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Avec plus de 15 ans d'expérience, nous allions technologies de pointe et écoute attentive. 
                Vous savez toujours ce que nous faisons, pourquoi nous le faisons, et quelles sont vos options.
              </p>

              {/* Three Points */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Excellence des soins</h3>
                    <p className="text-sm text-muted-foreground">
                      Protocoles basés sur les dernières recommandations et mises à jour continues.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Confort du patient</h3>
                    <p className="text-sm text-muted-foreground">
                      Gestion de la douleur optimisée, parcours clair et temps dédiés à vos questions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Axé famille</h3>
                    <p className="text-sm text-muted-foreground">
                      Des tout‑petits aux seniors, nous adaptons nos soins, notre langage et nos outils.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground italic">
                Un plateau technique de dernière génération dans une ambiance ultra apaisante.
              </p>
            </div>

            {/* Images */}
            <div className="relative">
              <ScrollReveal delay={150}>
                <div className="relative transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 animate-wiggle" style={{ animationDuration: "4s", animationIterationCount: "infinite" }}>
                  <img 
                    src="/assets/hero2.jpg"
                    alt="Cabinet Dentalis Studio"
                    className="w-3/4 h-auto shadow-xl"
                    draggable={false}
                  />
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={300}>
                <div className="relative -mt-12 ml-24 transform -rotate-2 hover:rotate-0 transition-all duration-700 hover:scale-105 animate-wiggle" style={{ animationDuration: "4s", animationDelay: "2s", animationIterationCount: "infinite" }}>
                  <img 
                    src="/assets/dentiste.jpg"
                    alt="Dr Sarah Johnson"
                    className="w-3/4 h-auto max-h-[280px] object-cover shadow-xl"
                    draggable={false}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={450}>
          <section id="team" className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-stretch">
            <div className="relative flex h-full items-center justify-center">
              <img 
                src="/assets/femaledentist2.png"
                alt={LEAD_DOCTOR.name}
                className="float-soft max-h-[320px] w-[85%] max-w-[420px] object-contain"
                style={{ animationDuration: "10s" }}
                draggable={false}
              />
            </div>

            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">L'équipe Dentalis</p>
              <div className="space-y-2">
                <h3 className="text-3xl font-serif text-foreground">{LEAD_DOCTOR.name}</h3>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{LEAD_DOCTOR.role}</p>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">{LEAD_DOCTOR.description}</p>

              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {LEAD_DOCTOR.focusPoints.map((item) => (
                  <span key={item} className="rounded-full border border-border/60 px-4 py-2">
                    {item}
                  </span>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Hygiénistes, assistantes et équipe d'accueil prolongent cette approche en coordonnant rappels, coaching et confort.</p>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </section>
  )
}
