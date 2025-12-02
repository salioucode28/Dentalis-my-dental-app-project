import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InlineCTA() {
  // Use same contact placeholders as in BookingCTA for consistency
  const PHONE_NUMBER = "+1234567890"
  const WHATSAPP_NUMBER = "1234567890"

  return (
    <section className="border-t border-border/80 bg-background/80 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <div className="space-y-1 text-xs text-muted-foreground sm:text-sm">
          <p className="font-medium text-foreground">
            Une question avant de réserver&nbsp;? Parlons‑en.
          </p>
          <p>
            Expliquez‑nous votre besoin, nous vous orientons vers le bon type de rendez‑vous.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="rounded-full bg-primary px-7 py-5 text-sm text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3">
            <Phone className="w-5 h-5" />
            Appeler la clinique
          </a>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-full px-7 py-5 text-sm"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            Écrire sur WhatsApp
          </a>
        </Button>
      </div>
    </section>
  )
}
