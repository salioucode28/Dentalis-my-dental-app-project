import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import FamilyStories from "@/components/family-stories"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <FamilyStories />
      <Contact />
      <Footer />
    </main>
  )
}
