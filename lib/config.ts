// Global configuration constants for Dentalis
export const CLINIC_CONFIG = {
  name: "Dentalis",
  tagline: "Smile with confidence.",
  description: "Professional dental care for the whole family. Book your appointment today via phone or WhatsApp.",

  // Contact Information
  phone: "+1234567890",
  whatsapp: "1234567890",
  email: "contact@dentalis.com",

  // Address
  address: "123 Rue du Sourire, Bâtiment A, Votre Ville, 75000",

  // Business Hours
  hours: [
    { day: "Lundi – Vendredi", time: "08:00 – 18:00" },
    { day: "Samedi", time: "09:00 – 15:00" },
    { day: "Dimanche", time: "Fermé" },
  ],

  // Social Media (placeholders)
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },

  // Services
  services: [
    {
      icon: "Sparkles",
      title: "Blanchiment des dents",
      description: "Traitements de blanchiment professionnels pour un sourire plus lumineux et assuré.",
    },
    {
      icon: "Shield",
      title: "Soins préventifs",
      description: "Contrôles réguliers, détartrages et soins préventifs pour préserver votre santé bucco‑dentaire.",
    },
    {
      icon: "Smile",
      title: "Dentisterie esthétique",
      description: "Facettes, bonding et relooking du sourire pour sublimer votre apparence.",
    },
    {
      icon: "Stethoscope",
      title: "Dentisterie générale",
      description: "Soins complets incluant obturations, couronnes et traitements de canal.",
    },
    {
      icon: "Baby",
      title: "Dentisterie pédiatrique",
      description: "Soins doux et adaptés aux enfants dans un environnement rassurant.",
    },
    {
      icon: "Zap",
      title: "Soins d'urgence",
      description: "Rendez‑vous le jour même pour les urgences dentaires.",
    },
  ],

  // Team Members
  team: [
    {
      name: "Dr Sarah Johnson, DDS",
      role: "Dentiste principale",
      description: "Avec 15 ans d'expérience en dentisterie générale et esthétique, le Dr Johnson est passionnée par la création de sourires beaux et sains.",
      avatar: "/assets/femaledentist.jpg",
    },
    {
      name: "Dr Michael Chen, DDS",
      role: "Spécialiste en pédodontie",
      description: "Le Dr Chen est spécialisé en dentisterie pédiatrique et rend les visites amusantes et confortables pour les enfants.",
      avatar: "/assets/maledentist.jpg",
    },
  ],

  // Features
  features: [
    {
      icon: "Award",
      title: "Excellence des soins",
      description: "Engagés à respecter les plus hauts standards de pratique dentaire.",
    },
    {
      icon: "Heart",
      title: "Confort du patient",
      description: "Offrir une expérience dentaire apaisante et sans anxiété.",
    },
    {
      icon: "Users",
      title: "Axé famille",
      description: "Prise en charge complète pour les patients de tous âges.",
    },
  ],
} as const

// Admin Configuration
export const ADMIN_CONFIG = {
  defaultEmail: "admin@dental.com",
  defaultPassword: "admin123",
} as const

// API Configuration
export const API_CONFIG = {
  rateLimit: {
    appointments: { windowMs: 60_000, maxRequests: 20 },
    auth: { windowMs: 60_000, maxRequests: 5 },
  },
} as const
