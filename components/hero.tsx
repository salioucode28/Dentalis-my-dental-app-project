"use client"

import { useEffect, useState } from "react"
import ContactButtons from "@/components/contact-buttons"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const imageSrc = "/assets/hero1.jpg"

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="accueil"
      className="relative min-h-screen px-4 py-10 md:py-16 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={imageSrc}
          alt="Dentalis"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>
      {/* Overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      {/* Content centered */}
      <div className="max-w-7xl mx-auto flex min-h-screen items-center justify-center">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.05] text-white">
            <span
              className={`block title-accent font-extrabold transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              } `}
              style={{ transitionDelay: isVisible ? "0ms" : "0ms" }}
            >
              Cabinet dentaire
            </span>
            <span
              className={`block title-accent font-extrabold transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
            >
              Dentalis
            </span>
          </h1>
          <p
            className={`mt-5 md:mt-6 text-2xl md:text-3xl lg:text-4xl text-gray-100 max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            Souriez autrement. Dentalis prend soin de vous.
          </p>

          <ContactButtons className="mt-8" />
        </div>
      </div>
    </section>
  )
}

