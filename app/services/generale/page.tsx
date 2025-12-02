import Link from "next/link"

export default function GeneralePage() {
  return (
    <main className="min-h-screen bg-background px-4 pt-24 pb-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/#services"
          className="inline-flex text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          ← Retour aux soins
        </Link>
        <h1 className="text-3xl font-serif text-foreground md:text-4xl">Soins généraux</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          De la carie à la couronne, nous prenons en charge l’ensemble des soins quotidiens avec une approche douce et
          expliquée.
        </p>
      </div>
    </main>
  )
}



