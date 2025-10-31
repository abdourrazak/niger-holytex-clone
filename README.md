# 🛍️ Niger Holytex Clone - Plateforme E-commerce Moderne

Clone moderne et complet du site e-commerce [Niger Holytex](https://nigerholytex.com/), spécialisé dans la vente d'abayas, jilbabs, tuniques et accessoires islamiques.

> **"La grâce au service de la pudeur"**

## 🚀 Technologies Utilisées

### Frontend
- **Framework** : Next.js 16 (App Router) + React 19
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **UI Components** : Shadcn/UI
- **Animations** : Framer Motion
- **State Management** : Zustand
- **Forms** : React Hook Form + Zod
- **Icons** : Lucide React

### Backend
- **Framework** : Next.js API Routes
- **Base de données** : PostgreSQL (Supabase)
- **ORM** : Prisma
- **Authentification** : Better Auth (Google, GitHub, Email/Password)

### Hébergement
- **Frontend** : Vercel
- **Backend & DB** : Supabase

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase (gratuit)

### 1. Cloner le projet

```bash
git clone <repository-url>
cd niger-holytex-clone
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Consultez le fichier **[ENV_SETUP.md](./ENV_SETUP.md)** pour les instructions détaillées.

Créez un fichier `.env.local` à la racine :

```bash
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="..."
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma db push

# (Optionnel) Seed la base avec des données de test
npm run seed
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
niger-holytex-clone/
├── prisma/
│   └── schema.prisma          # Schéma de la base de données
├── public/
│   └── images/                # Images du site
├── src/
│   ├── app/                   # Pages Next.js (App Router)
│   │   ├── (auth)/           # Routes d'authentification
│   │   ├── (shop)/           # Routes boutique
│   │   ├── api/              # API Routes
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/               # Composants Shadcn/UI
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── product/          # Composants produits
│   │   └── cart/             # Composants panier
│   ├── lib/
│   │   ├── stores/           # Zustand stores
│   │   ├── auth.ts           # Configuration Better Auth
│   │   ├── auth-client.ts    # Client Auth (frontend)
│   │   ├── prisma.ts         # Client Prisma
│   │   └── utils.ts          # Utilitaires
│   └── hooks/                # Custom React hooks
├── ENV_SETUP.md              # Guide configuration environnement
└── README.md                 # Ce fichier
```

## 🎯 Fonctionnalités

### ✅ Phase 1 - Complétée
- [x] Configuration Next.js + TypeScript
- [x] Setup Tailwind CSS + Shadcn/UI
- [x] Configuration Framer Motion
- [x] Setup Zustand (Cart & Wishlist stores)
- [x] Configuration Prisma ORM
- [x] Setup Better Auth
- [x] Structure de dossiers

### 🚧 À venir (Phases 2-10)
- [ ] Modélisation complète de la base de données
- [ ] Design system et composants UI
- [ ] Système d'authentification complet
- [ ] Gestion des produits et catégories
- [ ] Système de panier et wishlist
- [ ] Checkout et commandes
- [ ] Intégration paiements (Wave, Orange Money, Stripe)
- [ ] Pages principales (Accueil, Boutique, Produit)
- [ ] Dashboard administrateur
- [ ] Optimisations et déploiement

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev              # Lancer le serveur de développement

# Build
npm run build            # Créer un build de production
npm run start            # Lancer le build de production

# Base de données
npx prisma generate      # Générer le client Prisma
npx prisma db push       # Pousser le schéma vers la DB
npx prisma studio        # Ouvrir l'interface Prisma Studio
npx prisma migrate dev   # Créer une migration

# Linting
npm run lint             # Vérifier le code avec ESLint
```

## 🎨 Design & UI

Le design reproduit fidèlement l'identité visuelle de Niger Holytex :
- Palette de couleurs élégante et sobre
- Typography moderne et lisible
- Layout responsive (mobile-first)
- Animations fluides avec Framer Motion
- Composants réutilisables avec Shadcn/UI

## 🔐 Authentification

Système d'authentification complet avec Better Auth :
- **Email/Password** : Inscription et connexion classique
- **OAuth** : Google et GitHub
- **Sessions** : Gestion automatique des sessions
- **Protection** : Routes protégées pour l'espace client

## 💳 Paiements (Phase 6)

Intégration de plusieurs passerelles de paiement :
- **Wave** : Mobile money (Afrique de l'Ouest)
- **Orange Money** : Mobile money
- **MTN Mobile Money** : Mobile money
- **Stripe** : Cartes bancaires internationales
- **PayPal** : Paiements internationaux

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

Ou connectez votre repository GitHub à Vercel pour un déploiement automatique.

### Variables d'environnement en production

N'oubliez pas de configurer toutes les variables d'environnement dans Vercel Dashboard :
- Settings → Environment Variables
- Ajoutez toutes les variables de `.env.local`
- Changez les URLs pour votre domaine de production

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://better-auth.com/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est un clone éducatif du site Niger Holytex.

## 👨‍💻 Auteur

Développé avec ❤️ par [Votre Nom]

---

**Note** : Ce projet est en cours de développement. Consultez le plan complet dans les issues du repository.
