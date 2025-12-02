import Link from "next/link"

const SESSION_STEPS = [
  {
    title: "Diagnostic couleur",
    description: "Analyse photo, teinte initiale et questionnaire de sensibilité pour calibrer l’éclairage.",
  },
  {
    title: "Pré-traitement",
    description: "Nettoyage doux, protection gingivale et application d’un gel minéralisant.",
  },
  {
    title: "Activation lumineuse",
    description: "Deux cycles de 15 minutes avec lampe froide pour un éclaircissement uniforme.",
  },
]

const FAQ = [
  {
    question: "Le blanchiment est-il douloureux ?",
    answer:
      "Nos protocoles utilisent une lampe froide et un gel désensibilisant. De légères sensibilités peuvent apparaître 24h mais disparaissent rapidement avec le kit fourni.",
  },
  {
    question: "Quelle durée pour conserver la teinte ?",
    answer:
      "En moyenne 12 à 18 mois selon votre hygiène et votre consommation de café/thé. Nous proposons un rappel express de 30 minutes à 6 mois si besoin.",
  },
  {
    question: "Puis-je combiner blanchiment et facettes ?",
    answer:
      "Oui. Nous blanchissons d’abord les dents naturelles puis adaptons la teinte des facettes pour conserver l’harmonie globale.",
  },
]

export default function BlanchimentPage() {
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
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Esthétique</p>
            <h1 className="text-3xl font-serif text-foreground md:text-5xl">Blanchiment lumineux</h1>
            <p className="text-base text-muted-foreground">
              Traitement sur-mesure en cabinet, complété d’un kit de maintien à domicile. Notre priorité : un résultat
              visible dès la première séance, sans sensibiliser l’émail.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {SESSION_STEPS.map((step) => (
            <div key={step.title} className="space-y-2 rounded-3xl border border-border/60 bg-white/70 p-5">
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



