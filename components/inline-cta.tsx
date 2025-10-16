import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InlineCTA() {
  // Use same contact placeholders as in BookingCTA for consistency
  const PHONE_NUMBER = "+1234567890"
  const WHATSAPP_NUMBER = "1234567890"

  return (
    <section className="py-10 px-4 bg-card/50 border-t border-b border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full shadow-sm"
        >
          <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3">
            <Phone className="w-5 h-5" />
            Call Now: {PHONE_NUMBER}
          </a>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="px-8 py-6 text-lg rounded-full"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </Button>
      </div>
    </section>
  )
}
