import Link from "next/link"

export default function EnfantPage() {
  return (
    <main className="min-h-screen bg-background px-4 pt-24 pb-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/#services"
          className="inline-flex text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          ← Retour aux soins
        </Link>
        <h1 className="text-3xl font-serif text-foreground md:text-4xl">Dentisterie enfant</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Nous accompagnons les enfants dès leurs premières dents, avec des rendez-vous adaptés à leur rythme et leur
          curiosité.
        </p>
      </div>
    </main>
  )
}






