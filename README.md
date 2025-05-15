# Project AI - Admin

Ce repository correspond à la partie **admin** du projet [Project AI](https://github.com/dceleste35/project-ai), réalisé en équipe dans le cadre de la matière **Projet Annuel** à l'ESGI de Rennes.

## Objectif

Développer une interface d'administration permettant la gestion des utilisateurs, des modèles LLM et des accès à la plateforme Project AI.

## Fonctionnalités principales

- Authentification (login/register)
- Gestion des utilisateurs (liste, détail, modification)
- Gestion des modèles LLM (liste, détail, modification)
- Dashboard administrateur

## Technologies utilisées

- **React** (TypeScript)
- **React Router** (gestion des routes)
- **Vite** (outillage front-end)
- **GitHub** (collaboration et versioning)

## Installation

```bash
git clone https://github.com/Hitch95/project_ai_admin.git
cd project_ai_admin
npm install # ou Yarn ou pnpm
npm run dev
```

## Structure des routes principales

- `/login` : Connexion
- `/register` : Inscription
- `/admin` : Dashboard admin (accueil)
- `/users` : Liste des utilisateurs
- `/user/:id` : Détail d'un utilisateur
- `/llm` : Liste des modèles LLM
- `/llm/:id` : Détail d'un modèle LLM

## Travail en équipe

Projet réalisé en collaboration pour l'ESGI, dans le cadre du module "Projet Annuel".

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE).
