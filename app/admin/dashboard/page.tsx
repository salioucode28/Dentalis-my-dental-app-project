"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
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
import { CalendarDays, Users, Clock, TrendingUp, Activity, BarChart3, PieChart, AlertCircle, Search, Filter, Save, RotateCcw, Database, Trash2, Edit } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line } from "recharts"
import { useBackupSystem, backupManager } from "@/lib/backup-system"

// Hook de debouncing
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const { backups, isLoading: backupLoading, createBackup, restoreBackup, deleteBackup, renameBackup } = useBackupSystem()
  
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
  
  // Nouveaux états pour les améliorations
  const [savedFilters, setSavedFilters] = useState<any[]>([])
  const [showSaveFilterDialog, setShowSaveFilterDialog] = useState(false)
  const [filterName, setFilterName] = useState("")
  
  // États pour le système de backup
  const [showBackupDialog, setShowBackupDialog] = useState(false)
  const [showRestoreDialog, setShowRestoreDialog] = useState(false)
  const [showResetConfirmDialog, setShowResetConfirmDialog] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState<any | null>(null)
  const [backupName, setBackupName] = useState("")
  const [showRenameDialog, setShowRenameDialog] = useState(false)
  const [newBackupName, setNewBackupName] = useState("")
  
  // Recherche avec debouncing
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

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
  }, [debouncedSearchQuery, statusFilter, dateFilter, page, limit, sort])

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

  const saveCurrentFilter = () => {
    if (!filterName.trim()) return
    
    const newFilter = {
      id: Date.now(),
      name: filterName,
      search: searchQuery,
      status: statusFilter,
      date: dateFilter,
      sort: sort,
      limit: limit
    }
    
    setSavedFilters([...savedFilters, newFilter])
    setFilterName("")
    setShowSaveFilterDialog(false)
    
    toast({
      title: "Filtre sauvegardé",
      description: `Le filtre "${filterName}" a été sauvegardé avec succès.`,
    })
  }

  const loadSavedFilter = (filter: any) => {
    setSearchQuery(filter.search)
    setStatusFilter(filter.status)
    setDateFilter(filter.date)
    setSort(filter.sort)
    setLimit(filter.limit)
    setPage(1)
    
    toast({
      title: "Filtre chargé",
      description: `Le filtre "${filter.name}" a été appliqué.`,
    })
  }

  const deleteSavedFilter = (id: number) => {
    setSavedFilters(savedFilters.filter(f => f.id !== id))
    toast({
      title: "Filtre supprimé",
      description: "Le filtre a été supprimé avec succès.",
    })
  }

  // Fonctions pour le système de backup
  const handleCreateBackup = async () => {
    setShowBackupDialog(true)
  }

  const confirmCreateBackup = async () => {
    try {
      const filters = { search: searchQuery, status: statusFilter, date: dateFilter, sort, limit }
      const backupNameToUse = backupName.trim() || `Backup ${new Date().toLocaleString('fr-FR')}`
      const backup = await createBackup(appointments, filters, stats, backupNameToUse)
      
      setBackupName("")
      setShowBackupDialog(false)
      
      toast({
        title: "Backup créé",
        description: `Backup "${backup.date}" créé avec succès (${backup.appointments.length} rendez-vous).`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le backup.",
        variant: "destructive"
      })
    }
  }

  const handleResetWithBackup = async () => {
    try {
      // Créer un backup avant de réinitialiser
      const filters = { search: searchQuery, status: statusFilter, date: dateFilter, sort, limit }
      const now = new Date()
      const timestamp = now.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).replace('/', '/').replace(':', 'h')
      
      await createBackup(appointments, filters, stats, `Backup ${timestamp}`)
      
      // Réinitialiser toutes les données
      setAppointments([])
      setFilteredAppointments([])
      setSearchQuery("")
      setStatusFilter("all")
      setDateFilter("")
      setPage(1)
      setSavedFilters([])
      
      setShowResetConfirmDialog(false)
      
      toast({
        title: "Réinitialisation effectuée",
        description: "Toutes les données ont été effacées et un backup a été créé automatiquement.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de réinitialiser les données.",
        variant: "destructive"
      })
    }
  }

  const handleRestoreBackup = async (backupId: string) => {
    try {
      const backup = await restoreBackup(backupId)
      
      // Restaurer les données
      setAppointments(backup.appointments)
      setFilteredAppointments(backup.appointments)
      setSearchQuery(backup.filters.search)
      setStatusFilter(backup.filters.status)
      setDateFilter(backup.filters.date)
      setSort(backup.filters.sort)
      setLimit(backup.filters.limit)
      setPage(1)
      
      setShowRestoreDialog(false)
      setSelectedBackup(null)
      
      toast({
        title: "Restauration effectuée",
        description: `Les données du backup "${backup.date}" ont été restaurées (${backup.appointments.length} rendez-vous).`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de restaurer le backup.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteBackup = async (backupId: string) => {
    try {
      await deleteBackup(backupId)
      toast({
        title: "Backup supprimé",
        description: "Le backup a été supprimé avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le backup.",
        variant: "destructive"
      })
    }
  }

  const handleRenameBackup = async (backupId: string) => {
    try {
      const backup = await renameBackup(backupId, newBackupName.trim())
      
      setNewBackupName("")
      setShowRenameDialog(false)
      setSelectedBackup(null)
      
      toast({
        title: "Backup renommé",
        description: `Le backup a été renommé en "${backup.name}".`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de renommer le backup.",
        variant: "destructive"
      })
    }
  }

  // Backup automatique au chargement
  useEffect(() => {
    if (appointments.length > 0) {
      const filters = { search: searchQuery, status: statusFilter, date: dateFilter, sort, limit }
      backupManager.autoBackup(appointments, filters, stats)
    }
  }, [appointments.length])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" })
      console.log("Logout response:", response)
    } finally {
      console.log("Redirecting to homepage...")
      router.push("/")
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
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
    today: appointments.filter((a) => a.date === new Date().toISOString().split("T")[0]).length,
    thisWeek: appointments.filter((a) => {
      const appointmentDate = new Date(a.date)
      const today = new Date()
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
      const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6))
      return appointmentDate >= weekStart && appointmentDate <= weekEnd
    }).length,
    thisMonth: appointments.filter((a) => {
      const appointmentDate = new Date(a.date)
      const today = new Date()
      return appointmentDate.getMonth() === today.getMonth() && appointmentDate.getFullYear() === today.getFullYear()
    }).length,
  }

  // Données pour les graphiques
  const statusData = [
    { name: "En attente", value: stats.pending, color: "bg-yellow-500" },
    { name: "Confirmés", value: stats.confirmed, color: "bg-green-500" },
    { name: "Annulés", value: stats.cancelled, color: "bg-red-500" },
  ]

  const weeklyData = [
    { day: "Lun", appointments: 4 },
    { day: "Mar", appointments: 7 },
    { day: "Mer", appointments: 3 },
    { day: "Jeu", appointments: 8 },
    { day: "Ven", appointments: 6 },
    { day: "Sam", appointments: 2 },
    { day: "Dim", appointments: 1 },
  ]

  const servicesData = appointments.reduce((acc: Record<string, number>, apt) => {
    acc[apt.service] = (acc[apt.service] || 0) + 1
    return acc
  }, {
    "Nettoyage dentaire": 0,
    "Consultation": 0,
    "Blanchiment": 0,
    "Orthodontie": 0,
    "Implantologie": 0,
    "Détartrage": 0
  })

  const hasActiveFilters = searchQuery || statusFilter !== "all" || dateFilter

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Tableau de bord Dentalis</h1>
            <p className="text-xs text-muted-foreground">Vue d'ensemble des rendez-vous à venir</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreateBackup}
              className="transition-all duration-300"
            >
              <Database className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRestoreDialog(true)}
              className="transition-all duration-300"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restaurer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetConfirmDialog(true)}
              className="transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="bg-transparent transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground rounded-full"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Enhanced Stats Cards with Animations */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all duration-500 hover:shadow-xl hover:scale-[1.03] rounded-2xl border-border/50 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Rendez-vous</CardTitle>
              <CalendarDays className="h-4 w-4 text-blue-600 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700 animate-fade-in">{stats.total}</div>
              <p className="text-xs text-blue-600 mt-1">+12% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500 hover:shadow-xl hover:scale-[1.03] rounded-2xl border-border/50 bg-gradient-to-br from-yellow-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">En attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-700 animate-fade-in">{stats.pending}</div>
              <p className="text-xs text-yellow-600 mt-1">À traiter aujourd'hui</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500 hover:shadow-xl hover:scale-[1.03] rounded-2xl border-border/50 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Confirmés</CardTitle>
              <Users className="h-4 w-4 text-green-600 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700 animate-fade-in">{stats.confirmed}</div>
              <p className="text-xs text-green-600 mt-1">Patients attendus</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500 hover:shadow-xl hover:scale-[1.03] rounded-2xl border-border/50 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Aujourd'hui</CardTitle>
              <Activity className="h-4 w-4 text-purple-600 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700 animate-fade-in">{stats.today}</div>
              <p className="text-xs text-purple-600 mt-1">Rendez-vous du jour</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Trend Line Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Tendance hebdomadaire
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="appointments" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Services Distribution Chart */}
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Répartition par service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={Object.entries(servicesData)
                      .filter(([_, count]) => (count as number) > 0)
                      .map(([service, count]) => ({
                        name: service,
                        value: count as number,
                        percentage: Math.round(((count as number) / appointments.length) * 100)
                      }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {Object.entries(servicesData)
                      .filter(([_, count]) => count > 0)
                      .map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={[
                            '#3b82f6', // Bleu
                            '#10b981', // Vert
                            '#f59e0b', // Orange
                            '#ef4444', // Rouge
                            '#8b5cf6', // Violet
                            '#06b6d4'  // Cyan
                          ][index % 6]} 
                        />
                      ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.value} rendez-vous ({data.percentage}%)
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
              
              {/* Légende personnalisée */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {Object.entries(servicesData)
                  .filter(([_, count]) => (count as number) > 0)
                  .map(([service, count], index) => {
                    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
                    const percentage = Math.round(((count as number) / appointments.length) * 100)
                    return (
                      <div key={service} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors[index % 6] }}
                        />
                        <span className="text-xs">
                          {service} ({percentage}%)
                        </span>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card className="rounded-2xl border-border/70">
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, prénom, téléphone..."
                    value={searchQuery}
                    onChange={(e) => {
                      setPage(1)
                      setSearchQuery(e.target.value)
                    }}
                    className="pl-10"
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

              {/* Filtres sauvegardés */}
              {savedFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-sm text-muted-foreground self-center">Filtres rapides:</span>
                  {savedFilters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant="outline"
                      size="sm"
                      onClick={() => loadSavedFilter(filter)}
                      className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                    >
                      {filter.name}
                    </Button>
                  ))}
                </div>
              )}

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

      {/* Backup Name Dialog */}
      {showBackupDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Nommer le backup
              </CardTitle>
              <CardDescription>
                Donnez un nom à votre backup pour le retrouver facilement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Nom du backup..."
                value={backupName}
                onChange={(e) => setBackupName(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={confirmCreateBackup} disabled={!backupName.trim()}>
                  Créer le backup
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowBackupDialog(false)
                  setBackupName("")
                }}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Save Filter Dialog */}
      {showSaveFilterDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <CardHeader>
              <CardTitle>Sauvegarder le filtre</CardTitle>
              <CardDescription>
                Donnez un nom à votre filtre actuel pour le réutiliser plus tard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Nom du filtre..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={saveCurrentFilter} disabled={!filterName.trim()}>
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowSaveFilterDialog(false)
                  setFilterName("")
                }}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Confirmer la réinitialisation
              </CardTitle>
              <CardDescription>
                Cette action va effacer toutes les données actuelles. Un backup automatique sera créé avant la réinitialisation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium">Ce qui sera sauvegardé :</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• {appointments.length} rendez-vous</li>
                  <li>• Filtres actifs</li>
                  <li>• Statistiques</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleResetWithBackup} variant="destructive">
                  Réinitialiser
                </Button>
                <Button variant="outline" onClick={() => setShowResetConfirmDialog(false)}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rename Backup Dialog */}
      {showRenameDialog && selectedBackup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <Card className="w-96 p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Renommer le backup
              </CardTitle>
              <CardDescription>
                Modifiez le nom du backup "{selectedBackup.name}"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Nouveau nom..."
                value={newBackupName}
                onChange={(e) => setNewBackupName(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={() => handleRenameBackup(selectedBackup.id)} disabled={!newBackupName.trim()}>
                  Renommer
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowRenameDialog(false)
                  setSelectedBackup(null)
                  setNewBackupName("")
                }}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Restore Backup Dialog */}
      {showRestoreDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Restaurer un backup
              </CardTitle>
              <CardDescription>
                Sélectionnez un backup à restaurer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {backups.length > 0 ? (
                <div>
                  <h4 className="text-sm font-medium mb-3">Backups disponibles</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {backups.map((backup) => (
                      <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{backup.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {backup.date} • {backup.appointments.length} rendez-vous • {(backup.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRestoreBackup(backup.id)}
                          >
                            Restaurer
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedBackup(backup)
                              setNewBackupName(backup.name)
                              setShowRenameDialog(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteBackup(backup.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Database className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Aucun backup disponible</p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowRestoreDialog(false)}>
                  Fermer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
