import { Heart } from "lucide-react"
import Link from "next/link"
import { CLINIC_CONFIG } from "@/lib/config"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif mb-4">{CLINIC_CONFIG.name}</h3>
            <p className="text-gray-300 dark:text-gray-400 leading-relaxed">{CLINIC_CONFIG.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Nos services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-white transition-colors text-sm opacity-70 hover:opacity-100"
                >
                  Espace personnel
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Soins d'urgence</h4>
            <p className="text-gray-300 dark:text-gray-400 leading-relaxed mb-2">
              Urgence dentaire&nbsp;? Nous proposons des rendez‑vous le jour même.
            </p>
            <a href={`tel:${CLINIC_CONFIG.phone}`} className="text-accent hover:text-white transition-colors font-semibold">
              Téléphone&nbsp;: {CLINIC_CONFIG.phone}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 dark:border-gray-800 pt-8 text-center">
          <p className="text-gray-300 dark:text-gray-400 flex items-center justify-center gap-2">
            © {currentYear} {CLINIC_CONFIG.name}. Réalisé avec <Heart className="w-4 h-4 text-red-400 fill-current" /> pour de beaux sourires.
          </p>
        </div>
      </div>
    </footer>
  )
}
