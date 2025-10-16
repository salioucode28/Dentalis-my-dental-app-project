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
    <section id="booking" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-balance">Réservez votre rendez-vous</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Remplissez le formulaire ci-dessous et nous vous contacterons pour confirmer votre rendez-vous
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Card className="max-w-3xl mx-auto shadow-xl">
            <CardHeader>
              <CardTitle>Informations du rendez-vous</CardTitle>
              <CardDescription>Tous les champs sont obligatoires</CardDescription>
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
                  className="w-full transition-all duration-300 hover:scale-[1.02]"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? "Envoi en cours..." : "Demander un rendez-vous"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre clinique pour confirmer votre
                  rendez-vous.
                </p>
              </form>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
