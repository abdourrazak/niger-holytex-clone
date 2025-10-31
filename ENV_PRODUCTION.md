# 🚀 Variables d'Environnement pour Vercel (Production)

## Variables à Configurer sur Vercel

Lorsque vous déployez sur Vercel, ajoutez ces variables d'environnement dans les paramètres du projet :

### Database (Supabase PostgreSQL)
```
DATABASE_URL=postgresql://postgres:693098877Ab@db.zpfwzxpdccuculwsrafy.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:693098877Ab@db.zpfwzxpdccuculwsrafy.supabase.co:5432/postgres
```

### Better Auth
```
BETTER_AUTH_SECRET=pkccGrC5sDdXm3/mT+DnseRJrqG8sDvHul/hiXw1CrU=
BETTER_AUTH_URL=https://votre-app.vercel.app
```

### Application
```
NEXT_PUBLIC_APP_URL=https://votre-app.vercel.app
```

### OAuth (Optionnel)
```
GOOGLE_CLIENT_ID=votre-google-client-id
GOOGLE_CLIENT_SECRET=votre-google-client-secret
GITHUB_CLIENT_ID=votre-github-client-id
GITHUB_CLIENT_SECRET=votre-github-client-secret
```

---

## 📝 Instructions de Déploiement

### 1. Préparer le Schéma Prisma pour Production

Le schéma doit supporter à la fois SQLite (local) et PostgreSQL (production).

### 2. Pousser le Code sur GitHub

```bash
git add .
git commit -m "🚀 Ready for Vercel deployment"
git push
```

### 3. Déployer sur Vercel

1. Allez sur https://vercel.com
2. Cliquez sur "Add New Project"
3. Importez votre repository GitHub `niger-holytex-clone`
4. Ajoutez les variables d'environnement ci-dessus
5. Cliquez sur "Deploy"

### 4. Après le Premier Déploiement

1. Récupérez l'URL de votre app (ex: `https://niger-holytex-clone.vercel.app`)
2. Mettez à jour les variables :
   - `BETTER_AUTH_URL`
   - `NEXT_PUBLIC_APP_URL`
3. Redéployez

### 5. Configurer OAuth (si nécessaire)

Mettez à jour les URLs de callback dans :
- **Google Cloud Console** : `https://votre-app.vercel.app/api/auth/callback/google`
- **GitHub OAuth Apps** : `https://votre-app.vercel.app/api/auth/callback/github`

---

## ⚠️ Important

- **En local** : Utilisez SQLite (`.env.local`)
- **En production** : Vercel utilisera Supabase PostgreSQL
- Les tables existent déjà dans Supabase (créées via `migration.sql`)
- Vercel aura accès à Supabase (pas de blocage réseau)

---

## 🔍 Vérification

Après déploiement, testez :
1. https://votre-app.vercel.app (page d'accueil)
2. https://votre-app.vercel.app/register (inscription)
3. https://votre-app.vercel.app/login (connexion)
