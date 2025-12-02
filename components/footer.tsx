import { Heart } from "lucide-react"
import Link from "next/link"
import { CLINIC_CONFIG } from "@/lib/config"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-0 border-t border-border/70 bg-primary px-4 py-8 sm:py-12">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-10 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-xl font-serif text-white sm:text-2xl">{CLINIC_CONFIG.name}</h3>
            <p className="mb-4 text-xs sm:text-sm text-slate-300">{CLINIC_CONFIG.tagline}</p>
            <p className="text-xs sm:text-sm text-slate-300">
              {CLINIC_CONFIG.address}
              <br />
              {CLINIC_CONFIG.phone}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#services" className="transition-colors hover:text-white">
                  Nos services
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-xs opacity-75 transition-colors hover:opacity-100 hover:text-white"
                >
                  Espace personnel
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
              Soins d'urgence
            </h4>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              Urgence dentaire&nbsp;? Nous proposons des rendez‑vous le jour même selon les disponibilités.
            </p>
            <a
              href={`tel:${CLINIC_CONFIG.phone}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors hover:text-white"
            >
              Téléphone&nbsp;: {CLINIC_CONFIG.phone}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-4 sm:pt-6 text-xs text-slate-300 md:flex-row">
          <p className="flex items-center gap-1 text-center sm:text-left">
            © {currentYear} {CLINIC_CONFIG.name}. Conçu avec{" "}
            <Heart className="h-3 w-3 fill-current text-red-400" /> pour des visites plus sereines.
          </p>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href={CLINIC_CONFIG.social.facebook} className="transition-colors hover:text-white text-xs sm:text-sm">
              Facebook
            </a>
            <a href={CLINIC_CONFIG.social.instagram} className="transition-colors hover:text-white text-xs sm:text-sm">
              Instagram
            </a>
            <a href={CLINIC_CONFIG.social.linkedin} className="transition-colors hover:text-white text-xs sm:text-sm">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
