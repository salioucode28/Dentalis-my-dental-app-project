"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { AppointmentDialog } from "@/components/admin/appointment-dialog"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import type { AppointmentStatus } from "@/lib/appointments"

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<any[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null)
  const [appointmentToDelete, setAppointmentToDelete] = useState<any | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [sort, setSort] = useState("createdAt:desc")
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)

  const handleExportCsv = () => {
    const params = new URLSearchParams()
    if (statusFilter !== "all") params.append("status", statusFilter)
    if (searchQuery) params.append("search", searchQuery)
    if (dateFilter) params.append("date", dateFilter)
    if (sort) params.append("sort", sort)
    params.append("format", "csv")
    const url = `/api/appointments?${params.toString()}`
    window.open(url, "_blank")
  }

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" })
        if (!res.ok) {
          router.push("/admin/login")
          return
        }
        loadAppointments()
      } catch {
        router.push("/admin/login")
      }
    }
    checkAuthAndLoad()
  }, [router])

  useEffect(() => {
    loadAppointments()
  }, [searchQuery, statusFilter, dateFilter, page, limit, sort])

  const loadAppointments = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (searchQuery) params.append("search", searchQuery)
      if (dateFilter) params.append("date", dateFilter)
      params.append("page", String(page))
      params.append("limit", String(limit))
      params.append("sort", sort)

      const response = await fetch(`/api/appointments?${params}`)
      const data = await response.json()

      if (data.success) {
        const transformedData = data.data.map((apt: any) => ({
          id: apt._id,
          firstName: apt.patientName.split(" ")[0] || "",
          lastName: apt.patientName.split(" ").slice(1).join(" ") || apt.patientName,
          phone: apt.patientPhone,
          email: apt.patientEmail || "",
          date: new Date(apt.appointmentDate).toISOString().split("T")[0],
          time: apt.appointmentTime,
          service: apt.service,
          status: apt.status,
          message: apt.message || "",
          createdAt: apt.createdAt,
        }))
        setAppointments(transformedData)
        setFilteredAppointments(transformedData)
        if (data.meta) {
          setPages(data.meta.pages ?? 1)
          setTotal(data.meta.total ?? transformedData.length)
          // Si la page actuelle dépasse le nombre total de pages, recadre vers la dernière page
          if (page > (data.meta.pages ?? 1)) {
            setPage(data.meta.pages ?? 1)
          }
        } else {
          setPages(1)
          setTotal(transformedData.length)
        }
      }
    } catch (error) {
      console.error("Error loading appointments:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les rendez-vous",
        variant: "destructive",
      })
    }
    setIsLoading(false)
  }

  // Client-side filtering is no longer used; server-side filters are applied via API params

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setDateFilter("")
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } finally {
      router.push("/admin/login")
    }
  }

  const handleAddAppointment = () => {
    setSelectedAppointment(null)
    setDialogOpen(true)
  }

  const handleEditAppointment = (appointment: any) => {
    setSelectedAppointment(appointment)
    setDialogOpen(true)
  }

  const handleSaveAppointment = async (appointmentData: any) => {
    try {
      const apiData = {
        patientName: `${appointmentData.firstName} ${appointmentData.lastName}`,
        patientPhone: appointmentData.phone,
        patientEmail: appointmentData.email,
        appointmentDate: new Date(appointmentData.date),
        appointmentTime: appointmentData.time,
        service: appointmentData.service,
        status: appointmentData.status,
        message: appointmentData.message,
      }

      if (selectedAppointment) {
        // Update existing
        const response = await fetch(`/api/appointments/${selectedAppointment.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        })

        const data = await response.json()

        if (data.success) {
          toast({
            title: "Rendez-vous modifié",
            description: "Le rendez-vous a été mis à jour avec succès.",
          })
        }
      } else {
        // Create new
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        })

        const data = await response.json()

        if (data.success) {
          toast({
            title: "Rendez-vous créé",
            description: "Le nouveau rendez-vous a été ajouté avec succès.",
          })
        }
      }

      loadAppointments()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const handleConfirmDelete = async () => {
    if (appointmentToDelete) {
      try {
        const response = await fetch(`/api/appointments/${appointmentToDelete.id}`, {
          method: "DELETE",
        })

        const data = await response.json()

        if (data.success) {
          toast({
            title: "Rendez-vous supprimé",
            description: "Le rendez-vous a été supprimé avec succès.",
            variant: "destructive",
          })
          loadAppointments()
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le rendez-vous",
          variant: "destructive",
        })
      }
    }
  }

  const getStatusBadge = (status: AppointmentStatus) => {
    const variants: Record<AppointmentStatus, string> = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    }

    const labels: Record<AppointmentStatus, string> = {
      pending: "En attente",
      confirmed: "Confirmé",
      cancelled: "Annulé",
    }

    return (
      <Badge className={variants[status]} variant="secondary">
        {labels[status]}
      </Badge>
    )
  }

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    today: appointments.filter((a) => a.date === new Date().toISOString().split("T")[0]).length,
  }

  const hasActiveFilters = searchQuery || statusFilter !== "all" || dateFilter

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tableau de bord Admin</h1>
            <p className="text-sm text-muted-foreground">Gestion des rendez-vous dentaires</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          >
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.confirmed}</div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Liste des rendez-vous</CardTitle>
                  <CardDescription>Gérez tous les rendez-vous de la clinique</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleExportCsv} className="transition-all duration-300">
                    Exporter CSV
                  </Button>
                  <Button onClick={handleAddAppointment} className="transition-all duration-300 hover:scale-[1.05]">
                    Nouveau rendez-vous
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Input
                    placeholder="Rechercher par nom, prénom, téléphone..."
                    value={searchQuery}
                    onChange={(e) => {
                      setPage(1)
                      setSearchQuery(e.target.value)
                    }}
                    className="pl-9"
                  />
                </div>

                <Select value={statusFilter} onValueChange={(v) => { setPage(1); setStatusFilter(v) }}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmé</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => { setPage(1); setDateFilter(e.target.value) }}
                  className="w-full md:w-[180px]"
                />

                {/* Sorting */}
                <Select value={sort} onValueChange={(v) => { setPage(1); setSort(v) }}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Tri" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt:desc">Création ↓</SelectItem>
                    <SelectItem value="createdAt:asc">Création ↑</SelectItem>
                    <SelectItem value="appointmentDate:desc">Date RDV ↓</SelectItem>
                    <SelectItem value="appointmentDate:asc">Date RDV ↑</SelectItem>
                  </SelectContent>
                </Select>

                {/* Page size */}
                <Select value={String(limit)} onValueChange={(v) => { setPage(1); setLimit(Number(v)) }}>
                  <SelectTrigger className="w-full md:w-[120px]">
                    <SelectValue placeholder="Par page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 / page</SelectItem>
                    <SelectItem value="10">10 / page</SelectItem>
                    <SelectItem value="20">20 / page</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="transition-all duration-300 hover:bg-muted bg-transparent"
                  >
                    Réinitialiser
                  </Button>
                )}
              </div>

              {hasActiveFilters && (
                <p className="text-sm text-muted-foreground">
                  {filteredAppointments.length} résultat{filteredAppointments.length !== 1 ? "s" : ""} trouvé
                  {filteredAppointments.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Chargement...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {hasActiveFilters ? "Aucun rendez-vous ne correspond à vos critères" : "Aucun rendez-vous trouvé"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium">{appointment.lastName}</TableCell>
                        <TableCell>{appointment.firstName}</TableCell>
                        <TableCell>{appointment.phone}</TableCell>
                        <TableCell>{new Date(appointment.date).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditAppointment(appointment)}
                              className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground bg-transparent"
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setAppointmentToDelete(appointment)
                                setDeleteDialogOpen(true)
                              }}
                              className="transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                            >
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* Pagination controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">Page {page} / {pages} • {total} résultat{total !== 1 ? "s" : ""}</div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                    >
                      Précédent
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page >= pages}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <AppointmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        appointment={selectedAppointment}
        onSave={handleSaveAppointment}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        appointmentName={appointmentToDelete ? `${appointmentToDelete.firstName} ${appointmentToDelete.lastName}` : ""}
      />
    </div>
  )
}
