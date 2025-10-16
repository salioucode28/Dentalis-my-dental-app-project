"use client"

import { useEffect, useMemo, useState } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Award, Heart, Users } from "lucide-react"

export default function About() {
  const [index, setIndex] = useState(0)
  const images = useMemo(() => ["/assets/hero2.jpg", "/assets/hero3.jpg"], [])

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 3500)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Bienvenue dans notre cabinet</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Chez Dentalis, nous croyons que chacun mérite un sourire sain et éclatant. Notre équipe expérimentée est
                dédiée à fournir des soins dentaires d'exception dans un environnement chaleureux et accueillant.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Avec plus de 15 ans d'expérience, nous allions les dernières technologies dentaires à une approche douce
                et centrée sur le patient. Votre confort et votre satisfaction sont nos priorités.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Excellence des soins</h3>
                    <p className="text-muted-foreground">Engagés à respecter les plus hauts standards de pratique dentaire.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Confort du patient</h3>
                    <p className="text-muted-foreground">Offrir une expérience dentaire apaisante et sans anxiété.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Axé famille</h3>
                    <p className="text-muted-foreground">Prise en charge complète pour les patients de tous âges.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative rounded-3xl overflow-hidden border border-border aspect-[4/3] transition-all duration-500 group hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40">
              <div className="absolute inset-0">
                {images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt="Clinique Dentalis"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${index === i ? "opacity-100" : "opacity-0"}`}
                    draggable={false}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={250}>
          <div
            id="team"
            className="mt-16 relative bg-secondary p-8 md:p-12 rounded-3xl border border-border transition-all duration-500 group hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40"
          >
            <h3 className="text-3xl font-serif text-foreground mb-6 transition-transform duration-300 group-hover:-translate-y-0.5">
              Rencontrez notre équipe
            </h3>
            <div className="space-y-6">
              <div className="border-t border-border pt-6 flex items-start gap-4 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Avatar className="w-20 h-20 flex-shrink-0 border-2 border-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <AvatarImage src="/assets/femaledentist.jpg" alt="Dr Sarah Johnson, DDS" />
                  <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                    DSJ
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-foreground mb-2">Dr Sarah Johnson, DDS</h4>
                  <p className="text-muted-foreground mb-2">Dentiste principale</p>
                  <p className="text-muted-foreground leading-relaxed">Avec 15 ans d'expérience en dentisterie générale et esthétique, le Dr Johnson est passionnée par la création de sourires beaux et sains.</p>
                </div>
              </div>
              <div className="border-t border-border pt-6 flex items-start gap-4 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Avatar className="w-20 h-20 flex-shrink-0 border-2 border-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <AvatarImage src="/assets/maledentist.jpg" alt="Dr Michael Chen, DDS" />
                  <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                    DMC
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-foreground mb-2">Dr Michael Chen, DDS</h4>
                  <p className="text-muted-foreground mb-2">Spécialiste en pédodontie</p>
                  <p className="text-muted-foreground leading-relaxed">Le Dr Chen est spécialisé en dentisterie pédiatrique et rend les visites amusantes et confortables pour les enfants.</p>
                </div>
              </div>

              <div className="border-t border-border pt-6 transition-transform duration-300 group-hover:-translate-y-0.5">
                <h4 className="text-xl font-semibold text-foreground mb-2">Notre équipe de soutien</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Notre équipe d'hygiénistes et d'assistants veillent à ce que votre visite soit agréable et sans stress.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
