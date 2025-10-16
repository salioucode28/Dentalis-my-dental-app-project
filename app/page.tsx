import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import BookingCTA from "@/components/booking-cta"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      <Hero />
      <Services />
      {/* Gradient: services -> about (progressive) */}
      <div aria-hidden className="h-16 bg-gradient-to-b from-secondary via-secondary/30 to-background" />
      <About />
      <BookingCTA />
      <Contact />
      <Footer />
    </main>
  )
}
