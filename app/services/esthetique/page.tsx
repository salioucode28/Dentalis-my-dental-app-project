import Link from "next/link"

const DESIGN_STEPS = [
  {
    title: "Smile design",
    description: "Photos studio, empreintes numériques et projection 3D du résultat pour valider les proportions.",
  },
  {
    title: "Prototype",
    description: "Essayage en résine temporaire directement sur vos dents pour tester forme et phonétique.",
  },
  {
    title: "Réalisation",
    description: "Facettes céramiques minimalistes ou composite haute précision posées en une à deux séances.",
  },
]

const FAQ = [
  {
    question: "Les facettes abîment-elles l’émail ?",
    answer:
      "Nous pratiquons une préparation ultra conservative (0,2 mm). Dans certains cas, aucune taille n’est nécessaire.",
  },
  {
    question: "Combien de temps durent les facettes ?",
    answer: "En moyenne 10 à 15 ans avec un suivi annuel. Les composites peuvent être repolis facilement.",
  },
  {
    question: "Puis-je corriger l’alignement sans bagues visibles ?",
    answer:
      "Oui, nous proposons des gouttières transparentes couplées à des facettes pour un changement complet mais discret.",
  },
]

export default function EsthetiquePage() {
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
            <h1 className="text-3xl font-serif text-foreground md:text-5xl">Esthétique du sourire</h1>
            <p className="text-base text-muted-foreground">
              Nous scénarisons chaque étape pour obtenir un résultat naturel : alignement discret, facettes minimalistes et
              harmonisation de la teinte.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {DESIGN_STEPS.map((step) => (
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






