"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/admin/dashboard")
      } else {
        setError(data.error || "Email ou mot de passe incorrect")
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border/70 bg-card/95 shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto inline-flex items-center justify-center rounded-2xl bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Admin • Dentalis
          </div>
          <CardTitle className="text-2xl font-semibold">Connexion au tableau de bord</CardTitle>
          <CardDescription>Gérez les rendez-vous de la clinique en toute sécurité.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@dental.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full rounded-full transition-all duration-300 hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="pt-3 text-center text-xs text-muted-foreground">
              <p>Démo : admin@dental.com / admin123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
