"use client"

import { MapPin, Clock } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { CLINIC_CONFIG } from "@/lib/config"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Venez nous voir</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous sommes idéalement situés et prêts à vous accueillir. Contactez‑nous à tout moment !
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ScrollReveal delay={100}>
            <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg group h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Notre adresse</h3>
                  <p className="text-muted-foreground leading-relaxed">{CLINIC_CONFIG.address}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-background p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg group h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <Clock className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Horaires</h3>
                  <div className="space-y-2">
                    {CLINIC_CONFIG.hours.map((hour, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{hour.day}</span>
                        <span className="text-foreground font-medium">{hour.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
