import { useState, useEffect } from 'react'

export interface BackupData {
  id: string
  name: string
  timestamp: number
  date: string
  appointments: any[]
  filters: {
    search: string
    status: string
    date: string
    sort: string
    limit: number
  }
  stats: {
    total: number
    pending: number
    confirmed: number
    cancelled: number
    today: number
    thisWeek: number
    thisMonth: number
  }
  version: string
  size: number
}

export interface BackupSystem {
  // Créer un backup
  createBackup: (appointments: any[], filters: any, stats: any, name?: string) => Promise<BackupData>
  
  // Récupérer tous les backups
  getAllBackups: () => BackupData[]
  
  // Restaurer un backup
  restoreBackup: (backupId: string) => Promise<BackupData>
  
  // Supprimer un backup
  deleteBackup: (backupId: string) => Promise<void>
  
  // Renommer un backup
  renameBackup: (backupId: string, newName: string) => Promise<BackupData>
  
  // Nettoyer les vieux backups
  cleanupOldBackups: (maxBackups?: number) => Promise<void>
  
  // Exporter un backup
  exportBackup: (backupId: string) => Promise<string>
  
  // Importer un backup
  importBackup: (backupData: string) => Promise<BackupData>
}

class BackupManager implements BackupSystem {
  private readonly STORAGE_KEY = 'dentalis_backups'
  private readonly MAX_BACKUPS = 10
  private readonly VERSION = '1.0.0'

  async createBackup(
    appointments: any[], 
    filters: any, 
    stats: any, 
    name?: string
  ): Promise<BackupData> {
    const backup: BackupData = {
      id: `backup_${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      name: name || `Backup ${new Date().toLocaleString('fr-FR')}`,
      timestamp: Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      appointments: JSON.parse(JSON.stringify(appointments)),
      filters: { ...filters },
      stats: { ...stats },
      version: this.VERSION,
      size: this.calculateSize(appointments, filters, stats)
    }

    const backups = this.getAllBackups()
    backups.push(backup)
    
    // Garder seulement les MAX_BACKUPS plus récents
    if (backups.length > this.MAX_BACKUPS) {
      backups.sort((a, b) => b.timestamp - a.timestamp)
      backups.splice(this.MAX_BACKUPS)
    }
    
    this.saveBackups(backups)
    
    return backup
  }

  getAllBackups(): BackupData[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Erreur lors de la récupération des backups:', error)
      return []
    }
  }

  async restoreBackup(backupId: string): Promise<BackupData> {
    const backups = this.getAllBackups()
    const backup = backups.find(b => b.id === backupId)
    
    if (!backup) {
      throw new Error('Backup non trouvé')
    }
    
    return backup
  }

  async deleteBackup(backupId: string): Promise<void> {
    const backups = this.getAllBackups()
    const filteredBackups = backups.filter(b => b.id !== backupId)
    this.saveBackups(filteredBackups)
  }

  async renameBackup(backupId: string, newName: string): Promise<BackupData> {
    const backups = this.getAllBackups()
    const backupIndex = backups.findIndex(b => b.id === backupId)
    
    if (backupIndex === -1) {
      throw new Error('Backup non trouvé')
    }
    
    backups[backupIndex].name = newName
    this.saveBackups(backups)
    
    return backups[backupIndex]
  }

  async cleanupOldBackups(maxBackups: number = this.MAX_BACKUPS): Promise<void> {
    const backups = this.getAllBackups()
    
    if (backups.length <= maxBackups) return
    
    backups.sort((a, b) => b.timestamp - a.timestamp)
    const keptBackups = backups.slice(0, maxBackups)
    
    this.saveBackups(keptBackups)
  }

  async exportBackup(backupId: string): Promise<string> {
    const backup = await this.restoreBackup(backupId)
    return JSON.stringify(backup, null, 2)
  }

  async importBackup(backupData: string): Promise<BackupData> {
    try {
      const backup: BackupData = JSON.parse(backupData)
      
      // Validation du backup
      if (!backup.id || !backup.timestamp || !backup.appointments) {
        throw new Error('Format de backup invalide')
      }
      
      // Générer un nouvel ID pour éviter les conflits
      backup.id = `imported_${Date.now()}${Math.random().toString(36).substr(2, 9)}`
      backup.date = new Date().toLocaleString('fr-FR')
      
      const backups = this.getAllBackups()
      backups.push(backup)
      
      this.saveBackups(backups)
      
      return backup
    } catch (error) {
      throw new Error('Impossible d\'importer le backup: ' + error)
    }
  }

  private saveBackups(backups: BackupData[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(backups))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des backups:', error)
      throw new Error('Impossible de sauvegarder les backups')
    }
  }

  private calculateSize(appointments: any[], filters: any, stats: any): number {
    const data = { appointments, filters, stats }
    return JSON.stringify(data).length
  }

  // Backup automatique quotidien
  async autoBackup(appointments: any[], filters: any, stats: any): Promise<void> {
    const today = new Date().toDateString()
    const lastBackupKey = 'dentalis_last_auto_backup'
    const lastBackup = localStorage.getItem(lastBackupKey)
    
    // Créer un backup automatique seulement si le dernier date d'aujourd'hui
    if (lastBackup !== today) {
      await this.createBackup(
        appointments, 
        filters, 
        stats, 
        `Auto-backup ${new Date().toLocaleDateString('fr-FR')}`
      )
      localStorage.setItem(lastBackupKey, today)
    }
  }
}

export const backupManager = new BackupManager()

// Hook React pour gérer les backups
export function useBackupSystem() {
  const [backups, setBackups] = useState<BackupData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setBackups(backupManager.getAllBackups())
  }, [])

  const createBackup = async (appointments: any[], filters: any, stats: any, name?: string) => {
    setIsLoading(true)
    try {
      const backup = await backupManager.createBackup(appointments, filters, stats, name)
      setBackups(backupManager.getAllBackups())
      return backup
    } finally {
      setIsLoading(false)
    }
  }

  const restoreBackup = async (backupId: string) => {
    setIsLoading(true)
    try {
      const backup = await backupManager.restoreBackup(backupId)
      return backup
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBackup = async (backupId: string) => {
    setIsLoading(true)
    try {
      await backupManager.deleteBackup(backupId)
      setBackups(backupManager.getAllBackups())
    } finally {
      setIsLoading(false)
    }
  }

  const renameBackup = async (backupId: string, newName: string) => {
    setIsLoading(true)
    try {
      const backup = await backupManager.renameBackup(backupId, newName)
      setBackups(backupManager.getAllBackups())
      return backup
    } finally {
      setIsLoading(false)
    }
  }

  const exportBackup = async (backupId: string) => {
    setIsLoading(true)
    try {
      return await backupManager.exportBackup(backupId)
    } finally {
      setIsLoading(false)
    }
  }

  const importBackup = async (backupData: string) => {
    setIsLoading(true)
    try {
      const backup = await backupManager.importBackup(backupData)
      setBackups(backupManager.getAllBackups())
      return backup
    } finally {
      setIsLoading(false)
    }
  }

  return {
    backups,
    isLoading,
    createBackup,
    restoreBackup,
    deleteBackup,
    renameBackup,
    exportBackup,
    importBackup
  }
}
