"use client"

import { ScrollReveal } from "./scroll-reveal"
import { Sparkles, Shield, Smile, Stethoscope, Baby, Zap } from "lucide-react"

export default function Services() {
  return (
    <section id="services" className="pt-20 pb-16 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Nos services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des soins dentaires complets, adaptés à vos besoins, dispensés avec expertise et bienveillance.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal delay={0}>
            <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg group h-full">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Sparkles className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif title-accent mb-3">Blanchiment des dents</h3>
              <p className="text-muted-foreground leading-relaxed">Traitements de blanchiment professionnels pour un sourire plus lumineux et assuré.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg group h-full">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Shield className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif title-accent mb-3">Soins préventifs</h3>
              <p className="text-muted-foreground leading-relaxed">Contrôles réguliers, détartrages et soins préventifs pour préserver votre santé bucco‑dentaire.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg group h-full">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Smile className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif title-accent mb-3">Dentisterie esthétique</h3>
              <p className="text-muted-foreground leading-relaxed">Facettes, bonding et relooking du sourire pour sublimer votre apparence.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg group h-full">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Stethoscope className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif title-accent mb-3">Dentisterie générale</h3>
              <p className="text-muted-foreground leading-relaxed">Soins complets incluant obturations, couronnes et traitements de canal.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg group h-full">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Baby className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif title-accent mb-3">Dentisterie pédiatrique</h3>
              <p className="text-muted-foreground leading-relaxed">Soins doux et adaptés aux enfants dans un environnement rassurant.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={500}>
            <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg group h-full">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Zap className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif title-accent mb-3">Soins d'urgence</h3>
              <p className="text-muted-foreground leading-relaxed">Rendez‑vous le jour même pour les urgences dentaires.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
