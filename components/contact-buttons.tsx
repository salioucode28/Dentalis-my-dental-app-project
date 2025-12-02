import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CLINIC_CONFIG } from "@/lib/config"

interface ContactButtonsProps {
  variant?: "default" | "outline"
  size?: "sm" | "lg"
  className?: string
}

export default function ContactButtons({
  variant = "outline",
  size = "lg",
  className = "",
}: ContactButtonsProps) {
  const baseClasses =
    "px-6 md:px-8 py-4 md:py-5 rounded-full text-base md:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all duration-300"

  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}>
      <Button
        asChild
        size={size}
        variant={variant === "default" ? "default" : "outline"}
        className={`${baseClasses} border-2 border-primary/70 bg-primary text-primary-foreground hover:bg-primary/90 hover:border-primary`}
      >
        <a href={`tel:${CLINIC_CONFIG.phone}`} className="flex items-center gap-3">
          <Phone className="w-5 h-5 md:w-6 md:h-6" />
          <span>Appelez-nous</span>
        </a>
      </Button>

      <Button
        asChild
        size={size}
        variant="outline"
        className={`${baseClasses} border-2 border-primary/70 bg-primary text-primary-foreground hover:bg-primary/90 hover:border-primary`}
      >
        <a
          href={`https://wa.me/${CLINIC_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          <span>WhatsApp</span>
        </a>
      </Button>
    </div>
  )
}
