import { Calendar } from "lucide-react"
import ContactButtons from "@/components/contact-buttons"

export default function BookingCTA() {
  return (
    <section className="relative py-20 px-4 text-white overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/background.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-black/40" />
      <div className="max-w-4xl mx-auto text-center">
        <Calendar className="w-16 h-16 mx-auto mb-6 opacity-90" />
        <h2 className="text-4xl md:text-5xl font-serif mb-6">Prêt à planifier votre visite&nbsp;?</h2>
        <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto text-pretty">
          Réservez votre rendez-vous dès aujourd’hui et faites le premier pas vers un sourire plus sain et plus éclatant. Nous sommes là pour vous aider&nbsp;!
        </p>

        <ContactButtons />
      </div>
    </section>
  )
}
