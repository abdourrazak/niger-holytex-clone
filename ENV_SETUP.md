# Configuration des Variables d'Environnement

Ce fichier contient toutes les instructions pour configurer les variables d'environnement nécessaires au bon fonctionnement de l'application Niger Holytex Clone.

## 📋 Étapes de Configuration

### 1. Créer le fichier `.env.local`

À la racine du projet, créez un fichier nommé `.env.local` et copiez-y les variables ci-dessous :

```bash
# ============================================
# DATABASE (Supabase PostgreSQL)
# ============================================
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# ============================================
# BETTER AUTH
# ============================================
BETTER_AUTH_SECRET="your-secret-key-minimum-32-characters-long"
BETTER_AUTH_URL="http://localhost:3000"

# ============================================
# OAUTH PROVIDERS (Optionnel)
# ============================================
# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# GitHub OAuth
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# ============================================
# APPLICATION
# ============================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ============================================
# PAYMENT GATEWAYS (À configurer plus tard)
# ============================================
# Wave API
WAVE_API_KEY=""
WAVE_API_SECRET=""

# Orange Money
ORANGE_MONEY_API_KEY=""
ORANGE_MONEY_API_SECRET=""

# Stripe (optionnel)
STRIPE_PUBLIC_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

---

## 🗄️ Configuration Supabase (Base de données)

### Étape 1 : Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur **"New Project"**
4. Remplissez les informations :
   - **Name** : `niger-holytex-db`
   - **Database Password** : Choisissez un mot de passe fort (notez-le !)
   - **Region** : Choisissez la région la plus proche (ex: Europe West)
   - **Pricing Plan** : Free (pour commencer)
5. Cliquez sur **"Create new project"**

### Étape 2 : Récupérer l'URL de connexion

1. Dans votre projet Supabase, allez dans **Settings** → **Database**
2. Sous **Connection string**, sélectionnez **URI**
3. Copiez l'URL qui ressemble à :
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
4. Remplacez `[YOUR-PASSWORD]` par le mot de passe que vous avez créé
5. Collez cette URL dans votre `.env.local` comme valeur de `DATABASE_URL`

### Étape 3 : Initialiser la base de données avec Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables dans la base de données
npx prisma db push

# (Optionnel) Ouvrir Prisma Studio pour visualiser la DB
npx prisma studio
```

---

## 🔐 Configuration Better Auth

### Générer une clé secrète

Exécutez cette commande pour générer une clé secrète aléatoire :

```bash
openssl rand -base64 32
```

Copiez le résultat et utilisez-le comme valeur pour `BETTER_AUTH_SECRET` dans votre `.env.local`.

---

## 🔑 Configuration OAuth (Optionnel)

### Google OAuth

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet ou sélectionnez-en un existant
3. Activez **Google+ API**
4. Allez dans **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Type d'application : **Web application**
6. Authorized redirect URIs :
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Copiez le **Client ID** et **Client Secret** dans votre `.env.local`

### GitHub OAuth

1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Cliquez sur **New OAuth App**
3. Remplissez :
   - **Application name** : Niger Holytex
   - **Homepage URL** : `http://localhost:3000`
   - **Authorization callback URL** : `http://localhost:3000/api/auth/callback/github`
4. Cliquez sur **Register application**
5. Copiez le **Client ID** et générez un **Client Secret**
6. Ajoutez-les dans votre `.env.local`

---

## 💳 Configuration des Passerelles de Paiement (Phase 6)

Ces configurations seront nécessaires plus tard lors de la Phase 6.

### Wave (Afrique de l'Ouest)

1. Créez un compte marchand sur [Wave](https://www.wave.com)
2. Contactez le support pour obtenir vos clés API
3. Ajoutez-les dans `.env.local`

### Orange Money

1. Contactez Orange Money Business pour un compte marchand
2. Obtenez vos identifiants API
3. Ajoutez-les dans `.env.local`

### Stripe (International)

1. Créez un compte sur [Stripe](https://stripe.com)
2. Allez dans **Developers** → **API keys**
3. Copiez les clés **Publishable key** et **Secret key**
4. Pour le webhook secret :
   - Installez Stripe CLI : `brew install stripe/stripe-cli/stripe`
   - Connectez-vous : `stripe login`
   - Écoutez les webhooks : `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
5. Ajoutez toutes les clés dans `.env.local`

---

## ✅ Vérification de la Configuration

### 1. Vérifier que toutes les variables sont définies

```bash
# Afficher les variables d'environnement (sans les valeurs sensibles)
cat .env.local | grep -v "SECRET\|PASSWORD\|KEY" | grep "="
```

### 2. Tester la connexion à la base de données

```bash
npx prisma db pull
```

Si la commande réussit, votre connexion à Supabase fonctionne ! ✅

### 3. Démarrer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🚀 Production (Vercel)

Lorsque vous déployez sur Vercel, ajoutez toutes ces variables d'environnement dans :

**Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

⚠️ **Important** : 
- Changez `BETTER_AUTH_URL` et `NEXT_PUBLIC_APP_URL` pour votre domaine de production
- Utilisez des clés de production pour les passerelles de paiement
- Activez la vérification d'email (`requireEmailVerification: true` dans `src/lib/auth.ts`)

---

## 📝 Notes Importantes

1. **Ne commitez JAMAIS le fichier `.env.local`** - Il contient des informations sensibles
2. **Gardez une copie de secours** de vos variables d'environnement dans un gestionnaire de mots de passe
3. **Régénérez les clés** si elles sont compromises
4. **Utilisez des clés différentes** pour développement et production

---

## 🆘 Problèmes Courants

### Erreur : "Invalid `prisma.xxx()` invocation"
→ Vérifiez que `DATABASE_URL` est correcte et que la base de données est accessible

### Erreur : "BETTER_AUTH_SECRET must be at least 32 characters"
→ Générez une nouvelle clé avec `openssl rand -base64 32`

### OAuth ne fonctionne pas
→ Vérifiez que les URLs de callback sont correctement configurées dans les consoles OAuth

---

## 📞 Support

Si vous rencontrez des problèmes, consultez :
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Better Auth](https://better-auth.com/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Next.js](https://nextjs.org/docs)
