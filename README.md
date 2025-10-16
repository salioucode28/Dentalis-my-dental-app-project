# Dentalis - Application de Gestion de Rendez-vous Dentaires

## Vue d'ensemble

Application web moderne développée avec Next.js pour la gestion des rendez-vous dans une clinique dentaire. Le projet comprend un site web public vitrine et un tableau de bord administrateur complet pour la gestion opérationnelle.

## Fonctionnalités principales

### Site Web Public
- **Page d'accueil** avec présentation de la clinique
- **Services dentaires** : Consultation, blanchiment, soins préventifs, etc.
- **Présentation de l'équipe** médicale
- **Informations de contact** et coordonnées
- **Design responsive** optimisé pour tous les appareils

### Tableau de Bord Administrateur
- **Gestion complète des rendez-vous** : Création, modification, suppression
- **Statistiques en temps réel** : Total, en attente, confirmés, rendez-vous du jour
- **Recherche et filtrage avancés** : Par nom, téléphone, statut, date
- **Tri et pagination** pour une navigation efficace
- **Export CSV** des données de rendez-vous
- **Authentification sécurisée** avec système de sessions

## Architecture technique

### Technologies utilisées
- **Frontend** : Next.js 15, React 18, TypeScript
- **Stylisation** : Tailwind CSS, composants Radix UI
- **Base de données** : MongoDB avec Mongoose ODM
- **Authentification** : Sessions personnalisées avec bcryptjs
- **Validation** : Schémas Zod pour la sécurité des données
- **Protection** : Rate limiting contre les abus

### Structure du projet
```
dentalis/
├── app/                    # Pages Next.js (routes)
│   ├── admin/             # Dashboard et login admin
│   ├── api/               # Routes API REST
│   └── page.tsx           # Page d'accueil publique
├── components/            # Composants React réutilisables
├── lib/                   # Utilitaires et logique métier
│   ├── auth.ts           # Gestion des sessions
│   ├── db.ts             # Connexion MongoDB
│   ├── rateLimit.ts      # Protection contre les abus
│   └── validators/       # Schémas de validation Zod
├── models/               # Modèles MongoDB (User, Session, Appointment)
└── public/               # Assets statiques
```

## Installation et configuration

### Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- npm ou yarn

### Étapes d'installation
1. **Cloner le dépôt**
   ```bash
   git clone <repository-url>
   cd dentalis
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   Créer un fichier `.env.local` :
   ```env
   MONGODB_URI=mongodb://localhost:27017/dentalis
   NEXTAUTH_SECRET=votre-cle-secrete-unique
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_TOKEN=token-admin-unique
   ```

4. **Démarrer MongoDB** et l'application
   ```bash
   npm run dev
   ```

5. **Accéder à l'application**
   - Site public : http://localhost:3000
   - Admin : http://localhost:3000/admin/login

### Identifiants de démonstration
- **Email** : admin@dental.com
- **Mot de passe** : admin123

## API REST

### Endpoints principaux
- `GET /api/appointments` - Liste des rendez-vous (avec filtres)
- `POST /api/appointments` - Créer un rendez-vous
- `PUT /api/appointments/[id]` - Modifier un rendez-vous
- `DELETE /api/appointments/[id]` - Supprimer un rendez-vous
- `POST /api/auth/login` - Connexion administrateur
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Vérification de session

### Fonctionnalités API
- **Filtrage côté serveur** : statut, recherche, date, pagination
- **Validation des données** avec Zod
- **Rate limiting** : 5 tentatives/minute pour l'authentification
- **Gestion d'erreurs** structurée

## Sécurité et performance

### Mesures de sécurité
- **Hashage des mots de passe** avec bcryptjs
- **Sessions sécurisées** avec expiration (7 jours)
- **Validation stricte** des entrées utilisateur
- **Protection CSRF** implicite via SameSite cookies
- **Rate limiting** sur les endpoints sensibles

### Optimisations
- **Connexion persistante** à MongoDB (cache)
- **Pagination efficace** pour les grandes listes
- **Recherche optimisée** côté serveur
- **Lazy loading** des composants

## Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Vérification du code
```

## Fonctionnalités développées

### ✅ Implémentées
- [x] Site web public responsive
- [x] Dashboard admin complet
- [x] CRUD des rendez-vous
- [x] Authentification admin
- [x] Recherche et filtrage
- [x] Export CSV
- [x] Statistiques temps réel
- [x] Validation des données
- [x] Rate limiting
- [x] Gestion des sessions
- [x] Interface moderne et intuitive

### 🎯 Objectifs atteints
- Application fonctionnelle et complète
- Code TypeScript propre et maintenable
- Architecture scalable et sécurisée
- Interface utilisateur moderne
- Performance optimisée

## Outils IA utilisés dans le développement

- **v0** 
- **Windsurf** 
- **ChatGPT** 

---

**Projet final réalisé dans le cadre d'un cours de développement web moderne.**
