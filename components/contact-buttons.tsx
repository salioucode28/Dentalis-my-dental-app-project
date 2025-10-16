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
  className = ""
}: ContactButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}>
      <Button
        asChild
        size={size}
        variant={variant}
        className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-xl md:text-2xl lg:text-3xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
      >
        <a href={`tel:${CLINIC_CONFIG.phone}`} className="flex items-center gap-3">
          <Phone className="w-6 h-6 md:w-7 md:h-7" />
          Appelez-nous
        </a>
      </Button>

      <Button
        asChild
        size={size}
        variant={variant}
        className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-xl md:text-2xl lg:text-3xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
      >
        <a
          href={`https://wa.me/${CLINIC_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
          WhatsApp
        </a>
      </Button>
    </div>
  )
}
