import Link from "next/link"

export default function UrgencePage() {
  return (
    <main className="min-h-screen bg-background px-4 pt-24 pb-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/#services"
          className="inline-flex text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          ← Retour aux soins
        </Link>
        <h1 className="text-3xl font-serif text-foreground md:text-4xl">Urgences dentaires</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          En cas de douleur aiguë ou de choc, nous faisons notre possible pour vous recevoir rapidement et vous soulager
          au plus vite.
        </p>
      </div>
    </main>
  )
}



