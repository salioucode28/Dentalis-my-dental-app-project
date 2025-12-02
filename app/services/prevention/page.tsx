import Link from "next/link"

const VISIT_STEPS = [
  {
    title: "Bilan complet",
    description: "Scanner intra-oral, radios et analyse gingivale pour détecter les zones sensibles.",
  },
  {
    title: "Nettoyage confort",
    description: "Détartrage par ultrasons doux, polissage et application de vernis protecteur.",
  },
  {
    title: "Coaching personnalisé",
    description: "Plan d’hygiène, recommandations alimentaires et calendrier de rappel adapté à votre rythme.",
  },
]

const FAQ = [
  {
    question: "Quelle fréquence recommandez-vous ?",
    answer: "Deux visites par an suffisent pour la majorité des patients. Nous adaptons si vous êtes enceinte, porteur d’appareil ou sujet aux problèmes de gencives.",
  },
  {
    question: "Le détartrage est-il douloureux ?",
    answer: "Nos inserts ultrasoniques sont refroidis et nous pouvons utiliser une anesthésie locale légère si vos gencives sont très sensibles.",
  },
  {
    question: "Proposez-vous le rappel automatique ?",
    answer: "Oui, SMS et WhatsApp vous préviennent 1 mois puis 48h avant votre rendez-vous.",
  },
]

export default function PreventionPage() {
  return (
    <main className="min-h-screen bg-background px-4 pt-24 pb-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-4">
          <Link
            href="/#services"
            className="inline-flex text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            ← Retour aux soins
          </Link>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Prévention</p>
            <h1 className="text-3xl font-serif text-foreground md:text-5xl">Prévention & suivi</h1>
            <p className="text-base text-muted-foreground">
              Des visites rythmées, rapides et pédagogiques pour éviter les urgences. Nous anticipons chaque étape afin que
              vos dents restent stables toute l’année.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {VISIT_STEPS.map((step) => (
            <div key={step.title} className="space-y-2 rounded-3xl border border-border/60 bg-white/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <section className="space-y-4 rounded-3xl border border-border/60 bg-white/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details key={item.question} className="rounded-2xl border border-border/40 bg-background/70 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-foreground">{item.question}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}



