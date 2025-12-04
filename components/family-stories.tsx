"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const STORIES = [
  {
    id: 1,
    name: "Famille Martin",
    role: "Parents de deux enfants",
    quote: "Nos enfants n'avaient plus peur du dentiste. L'équipe prend vraiment le temps d'expliquer et de rassurer.",
    rating: 5,
    initials: "FM",
    image: "/assets/femaledentist.jpg",
  },
  {
    id: 2,
    name: "Amélie",
    role: "Patiente depuis 8 ans",
    quote: "Je viens seule puis avec ma fille. On a trouvé un cabinet où on se sent suivi, pas juste soigné.",
    rating: 5,
    initials: "A",
    image: "/assets/hero3.jpg",
  },
  {
    id: 3,
    name: "Karim",
    role: "Jeune actif",
    quote: "Les créneaux du soir me permettent de venir après le travail, et on trouve toujours une solution si je dois décaler.",
    rating: 5,
    initials: "K",
    image: "/assets/hero1.jpg",
  },
]

export default function FamilyStories() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % STORIES.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-slate-50 px-4 py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Ils nous font confiance
          </p>
          <h2 className="mb-4 text-2xl font-serif text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Ce que nos patients disent de nous
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Des témoignages authentiques qui reflètent notre engagement pour des soins dentaires exceptionnels
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {STORIES.map((story) => (
                <div key={story.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="mx-auto max-w-2xl">
                    <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-lg ring-1 ring-gray-100 md:p-8">
                      <div className="mb-4 flex items-center gap-3">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-primary/20">
                          <AvatarImage src={story.image} alt={story.name} />
                          <AvatarFallback className="bg-primary/10 text-xs sm:text-sm font-semibold text-primary">
                            {story.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-foreground">{story.name}</h3>
                          <p className="text-sm text-muted-foreground">{story.role}</p>
                          <div className="mt-1 flex gap-1">
                            {[...Array(story.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <blockquote className="relative">
                        <svg className="absolute -top-2 -left-2 h-4 w-4 sm:-top-3 sm:-left-3 sm:h-6 sm:w-6 text-primary/20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-sm text-muted-foreground leading-relaxed sm:text-base md:text-lg">
                          "{story.quote}"
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 sm:p-3 text-foreground shadow-lg backdrop-blur transition-all hover:bg-white hover:shadow-xl md:left-8"
            aria-label="Précédent"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 sm:p-3 text-foreground shadow-lg backdrop-blur transition-all hover:bg-white hover:shadow-xl md:right-8"
            aria-label="Suivant"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {STORIES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all md:h-3 ${
                index === currentIndex 
                  ? "w-8 bg-primary" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Aller à l'avis ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}






