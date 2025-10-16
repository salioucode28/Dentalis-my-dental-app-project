# TODO: Factorisation du projet Dentalis

## 1. Unifier les fichiers CSS globaux
- Fusionner `app/globals.css` et `styles/globals.css` en un seul fichier
- Supprimer les duplications et incohérences
- Garder le meilleur des deux (thème dentaire, animations, etc.)

## 2. Créer des constantes globales
- Extraire les numéros de téléphone, adresses, horaires dans un fichier de config
- Utiliser ces constantes dans tous les composants (hero, booking-cta, contact, etc.)

## 3. Réduire les duplications de modèles
- Unifier `models/Appointment.ts` et `lib/models/appointment.ts`
- Nettoyer `lib/models/admin.ts`, `lib/models/service.ts` si nécessaire
- Standardiser les interfaces et types

## 4. Factoriser les composants UI
- Créer un composant `ContactInfo` réutilisable pour les boutons d'appel/WhatsApp
- Extraire les styles communs dans des classes utilitaires
- Standardiser les animations et transitions

## 5. Nettoyer les imports et dépendances
- Vérifier les imports inutiles
- Supprimer les fichiers dupliqués ou obsolètes
- Optimiser les dépendances

## 6. Améliorer la structure des dossiers
- Regrouper les utilitaires dans `lib/utils`
- Organiser les types dans `types/`
- Nettoyer les scripts dans `app/scripts/`

## 7. Standardiser les styles et thèmes
- Utiliser des variables CSS cohérentes
- Appliquer le thème dentaire partout
- Supprimer les styles inline redondants
