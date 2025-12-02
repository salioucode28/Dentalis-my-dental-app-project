"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ScrollReveal } from "./scroll-reveal"

export default function BookingForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    service: "",
    message: "",
  })

  const services = [
    "Nettoyage et prévention",
    "Blanchiment dentaire",
    "Implants dentaires",
    "Orthodontie",
    "Soins d'urgence",
    "Chirurgie dentaire",
  ]

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: `${formData.firstName} ${formData.lastName}`,
          patientPhone: formData.phone,
          patientEmail: formData.email,
          appointmentDate: new Date(formData.date),
          appointmentTime: formData.time,
          service: formData.service,
          status: "pending",
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Rendez-vous demandé",
          description: "Nous vous contacterons bientôt pour confirmer votre rendez-vous.",
        })
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          service: "",
          message: "",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="booking" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Étape suivante
            </p>
            <h2 className="mb-3 font-serif text-3xl text-foreground md:text-4xl">
              Réservez votre prochain rendez-vous
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
              Dites‑nous qui vous êtes et quand vous souhaiteriez venir. Nous vous recontactons rapidement pour
              confirmer le créneau idéal.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Informations du rendez-vous</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Les champs marqués d’une étoile sont nécessaires pour vous rappeler.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      <User className="inline h-4 w-4 mr-2" />
                      Prénom
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                      placeholder="Jean"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      <User className="inline h-4 w-4 mr-2" />
                      Nom
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      placeholder="jean.dupont@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      <Calendar className="inline h-4 w-4 mr-2" />
                      Date souhaitée
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">
                      <Clock className="inline h-4 w-4 mr-2" />
                      Heure souhaitée
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value: string) => handleChange("time", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une heure" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Type de service</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value: string) => handleChange("service", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    <MessageSquare className="inline h-4 w-4 mr-2" />
                    Message (optionnel)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Décrivez brièvement la raison de votre visite..."
                    rows={4}
                  />
                </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full transition-all duration-300 hover:scale-[1.02]"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Demander un rendez-vous"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    En soumettant ce formulaire, vous acceptez d'être contacté par notre clinique pour confirmer votre
                    rendez-vous.
                  </p>
                </form>
              </CardContent>
            </Card>

            <Card className="h-full border-dashed border-border/80 bg-secondary/40">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Résumé & infos pratiques</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Un aperçu de votre demande avant notre appel de confirmation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs text-muted-foreground md:text-sm">
                <div className="rounded-2xl bg-background/70 p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                    Votre demande
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <span className="font-medium text-foreground/90">Nom&nbsp;:</span>{" "}
                      {formData.firstName || formData.lastName
                        ? `${formData.firstName} ${formData.lastName}`.trim()
                        : "À renseigner"}
                    </li>
                    <li>
                      <span className="font-medium text-foreground/90">Contact&nbsp;:</span>{" "}
                      {formData.phone || formData.email ? (
                        <>
                          {formData.phone && <span>{formData.phone}</span>}
                          {formData.phone && formData.email && <span> • </span>}
                          {formData.email && <span>{formData.email}</span>}
                        </>
                      ) : (
                        "Téléphone ou email à renseigner"
                      )}
                    </li>
                    <li>
                      <span className="font-medium text-foreground/90">Moment souhaité&nbsp;:</span>{" "}
                      {formData.date && formData.time ? (
                        <>
                          {formData.date} à {formData.time}
                        </>
                      ) : (
                        "À définir"
                      )}
                    </li>
                    <li>
                      <span className="font-medium text-foreground/90">Motif&nbsp;:</span>{" "}
                      {formData.service || "À choisir dans la liste"}
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 rounded-2xl bg-background/60 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                    Ce qu’il se passe ensuite
                  </p>
                  <ul className="list-inside list-decimal space-y-1">
                    <li>Nous vérifions nos disponibilités.</li>
                    <li>Nous vous appelons ou écrivons pour confirmer le créneau.</li>
                    <li>Vous recevez un rappel avant votre visite.</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-background/40 p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                    Infos pratiques
                  </p>
                  <p>En cas d’urgence aiguë, appelez‑nous directement pour un créneau prioritaire.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
