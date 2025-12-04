"use client"

import { Award, Heart, Users, Sparkles, Shield, Zap } from "lucide-react"

const LEAD_DOCTOR = {
  name: "Dr Sarah Johnson, DDS",
  role: "Dentiste principale",
  description:
    "Avec plusieurs années d'expérience, le Dr Sarah Johnson allie maîtrise technique et approche chaleureuse. Son expertise lui permet d'offrir des soins précis, confortables et parfaitement adaptés à chaque patient.",
  focusPoints: ["Smile design & facettes", "Prévention personnalisée", "Accompagnement des familles"],
  imagePrimary: "/assets/femaledentist.jpg",
  imageSecondary: "/assets/hero3.jpg",
}

export default function About() {
  return (
    <section id="about" className="bg-slate-50 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground">
              Bienvenue chez Dentalis Studio
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
              Un cabinet pensé comme un espace de calme : lumière douce, sons apaisants, gestes précis. 
              Chaque visite doit être aussi confortable que possible, pour vous comme pour votre famille.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 h-64">
              <img
                src="/assets/hero2.jpg"
                alt="Cabinet Dentalis Studio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 md:mt-8 h-64">
              <img
                src="/assets/dentiste.jpg"
                alt="Espace de consultation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 h-64">
              <img
                src="/assets/hero3.jpg"
                alt="Technologie de pointe"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <p className="max-w-2xl mx-auto text-sm text-muted-foreground italic">
            Un plateau technique de dernière génération dans une ambiance ultra apaisante.
          </p>
        </div>

        <div className="relative py-16">
            {/* Main heading */}
            <div className="text-center space-y-16">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-wide">
                  Soins dentaires
                  <span className="block text-primary font-medium"> réinventés.</span>
                </h3>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
              </div>

              {/* Three cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                  
                  <div className="relative space-y-6 cursor-pointer">
                    <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        Précision absolue
                      </h4>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        Protocoles avancés pour des résultats impeccables
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                  
                  <div className="relative space-y-6 cursor-pointer">
                    <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Heart className="w-8 h-8 text-emerald-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-foreground group-hover:text-emerald-600 transition-colors duration-300">
                        Bien-être total
                      </h4>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        Douleur minimale, confort maximal, sérénité garantie
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                  
                  <div className="relative space-y-6 cursor-pointer">
                    <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Users className="w-8 h-8 text-purple-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-foreground group-hover:text-purple-600 transition-colors duration-300">
                        Tous âges
                      </h4>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        Soins adaptés à tout âge
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom statement */}
              <div className="max-w-2xl mx-auto space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  15 ans d'expertise. Technologies de pointe. Écoute attentive.
                  <span className="block text-primary font-medium mt-2">Vous comprenez. Vous décidez. Vous souriez.</span>
                </p>
              </div>
            </div>
          </div>

        <section id="team" className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-stretch">
          <div className="relative flex h-full items-center justify-center">
            <img
              src="/assets/femaledentist2.png"
              alt={LEAD_DOCTOR.name}
              className="max-h-[320px] w-[85%] max-w-[420px] object-contain"
              draggable={false}
            />
          </div>

          <div className="space-y-5">
            <h3 className="text-3xl md:text-4xl font-serif text-foreground">L'équipe Dentalis</h3>
            <div className="space-y-2">
              <h3 className="text-3xl font-serif text-foreground">{LEAD_DOCTOR.name}</h3>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{LEAD_DOCTOR.role}</p>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">{LEAD_DOCTOR.description}</p>

            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {LEAD_DOCTOR.focusPoints.map((item) => (
                <span key={item} className="rounded-full border border-border/60 px-4 py-2">
                  {item}
                </span>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Hygiénistes, assistantes et équipe d'accueil prolongent cette approche en coordonnant rappels, coaching et confort.</p>
            </div>
          </div>
        </section>

        {/* Additional Dentists Section */}
        <section className="mt-24 space-y-12">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-primary">L'équipe d'experts</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-foreground">
                Des spécialistes à votre service
              </h3>
              <p className="max-w-2xl mx-auto text-sm text-muted-foreground">
                Chaque praticien apporte son expertise unique pour garantir des soins complets et personnalisés.
              </p>
            </div>

            {/* Minimalist Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-4xl mx-auto">
              {/* Dentist 1 */}
              <div className="text-center group cursor-pointer">
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="relative mx-auto w-24 h-24">
                    <div className="w-full h-full rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <img
                        src="/assets/martin klein.jpg"
                        alt="Martin Klein"
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-slate-300 rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-lg font-light text-foreground mb-1">Martin Klein</h4>
                      <p className="text-xs text-slate-500 tracking-wider uppercase">Orthodontiste</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 space-y-1">
                        <p>• Diplômé Université Paris Descartes</p>
                        <p>• Spécialisation Harvard 2018</p>
                        <p>• Expert Invisalign® et 3D scanning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dentist 2 */}
              <div className="text-center group cursor-pointer">
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="relative mx-auto w-24 h-24">
                    <div className="w-full h-full rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <img
                        src="/assets/sophie dubois.jpg"
                        alt="Sophie Dubois"
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-slate-300 rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-lg font-light text-foreground mb-1">Sophie Dubois</h4>
                      <p className="text-xs text-slate-500 tracking-wider uppercase">Parodontiste</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 space-y-1">
                        <p>• Doctorat UCL Bruxelles 2016</p>
                        <p>• Spécialisation implants Zurich</p>
                        <p>• Microchirurgie et régénération</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dentist 3 */}
              <div className="text-center group cursor-pointer">
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="relative mx-auto w-24 h-24">
                    <div className="w-full h-full rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <img
                        src="/assets/thomas leroy.jpg"
                        alt="Thomas Leroy"
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-slate-300 rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-lg font-light text-foreground mb-1">Thomas Leroy</h4>
                      <p className="text-xs text-slate-500 tracking-wider uppercase">Chirurgien-dentiste</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 space-y-1">
                        <p>• Diplômé Faculté Lyon 2017</p>
                        <p>• Formation céramique Japon</p>
                        <p>• Smile design et facettes ultra-minces</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Team Section */}
            <div className="text-center space-y-6 pt-12">
              <div className="w-px h-16 bg-slate-200 mx-auto" />
              <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                Hygiénistes, assistantes et équipe d'accueil prolongent cette approche en coordonnant rappels, coaching et confort.
              </p>
            </div>
          </section>
      </div>
    </section>
  )
}
