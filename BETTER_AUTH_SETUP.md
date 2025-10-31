# 🔐 Configuration Better Auth - Niger Holytex Clone

## ✅ Configuration Actuelle

Better Auth est maintenant configuré avec :

### Fonctionnalités Activées

- ✅ **Email/Password** : Inscription et connexion classique
- ✅ **Google OAuth** : Connexion avec Google (si configuré)
- ✅ **GitHub OAuth** : Connexion avec GitHub (si configuré)
- ✅ **Sessions** : Durée de 7 jours
- ✅ **Cookie Cache** : Cache de 5 minutes
- ✅ **Prisma Adapter** : Intégration avec la base de données

### Pages Créées

- ✅ `/login` - Page de connexion
- ✅ `/register` - Page d'inscription

### Composants Créés

- ✅ `useAuth` hook - Hook personnalisé pour l'authentification
- ✅ `UserNav` - Composant de navigation utilisateur

---

## 🔧 Configuration OAuth (Optionnel)

### Google OAuth

1. **Allez sur** : https://console.cloud.google.com
2. **Créez un projet** ou sélectionnez-en un
3. **Activez Google+ API**
4. **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. **Type** : Web application
6. **Authorized redirect URIs** :
   ```
   http://localhost:3000/api/auth/callback/google
   https://votre-domaine.vercel.app/api/auth/callback/google
   ```
7. **Copiez** le Client ID et Client Secret
8. **Ajoutez dans `.env.local`** :
   ```bash
   GOOGLE_CLIENT_ID="votre-client-id"
   GOOGLE_CLIENT_SECRET="votre-client-secret"
   ```

### GitHub OAuth

1. **Allez sur** : https://github.com/settings/developers
2. **New OAuth App**
3. **Remplissez** :
   - Application name : Niger Holytex
   - Homepage URL : `http://localhost:3000`
   - Authorization callback URL : `http://localhost:3000/api/auth/callback/github`
4. **Register application**
5. **Générez un Client Secret**
6. **Ajoutez dans `.env.local`** :
   ```bash
   GITHUB_CLIENT_ID="votre-client-id"
   GITHUB_CLIENT_SECRET="votre-client-secret"
   ```

---

## 📝 Utilisation dans le Code

### Hook useAuth

```typescript
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { user, isAuthenticated, isLoading, signIn, signOut } = useAuth()

  if (isLoading) return <div>Chargement...</div>
  if (!isAuthenticated) return <div>Non connecté</div>

  return (
    <div>
      <p>Bienvenue {user?.name}</p>
      <button onClick={() => signOut()}>Déconnexion</button>
    </div>
  )
}
```

### Connexion Email/Password

```typescript
import { signIn } from '@/lib/auth-client'

const result = await signIn.email({
  email: 'user@example.com',
  password: 'password123',
})

if (result.error) {
  console.error(result.error.message)
} else {
  // Connexion réussie
  router.push('/')
}
```

### Inscription

```typescript
import { signUp } from '@/lib/auth-client'

const result = await signUp.email({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
})

if (result.error) {
  console.error(result.error.message)
} else {
  // Inscription réussie
  router.push('/')
}
```

### Connexion OAuth

```typescript
import { signIn } from '@/lib/auth-client'

// Google
await signIn.social({
  provider: 'google',
  callbackURL: '/',
})

// GitHub
await signIn.social({
  provider: 'github',
  callbackURL: '/',
})
```

### Déconnexion

```typescript
import { signOut } from '@/lib/auth-client'

await signOut()
router.push('/login')
```

---

## 🔒 Protection des Routes

### Middleware (À créer)

Créez `src/middleware.ts` :

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('niger-holytex.session_token')

  // Routes protégées
  const protectedRoutes = ['/account', '/orders', '/checkout']
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*', '/orders/:path*', '/checkout/:path*'],
}
```

### Composant Protected

```typescript
'use client'

import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) return <div>Chargement...</div>
  if (!isAuthenticated) return null

  return <>{children}</>
}
```

---

## 🧪 Tester l'Authentification

### 1. Créer un compte

1. Allez sur http://localhost:3000/register
2. Remplissez le formulaire
3. Cliquez sur "S'inscrire"
4. Vous serez redirigé vers la page d'accueil

### 2. Se connecter

1. Allez sur http://localhost:3000/login
2. Entrez vos identifiants
3. Cliquez sur "Se connecter"

### 3. Vérifier dans Supabase

1. Allez sur votre dashboard Supabase
2. Cliquez sur "Table Editor"
3. Sélectionnez la table `users`
4. Vous devriez voir votre utilisateur

---

## 🚀 Production (Vercel)

### Variables d'environnement à ajouter sur Vercel

```bash
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="pkccGrC5sDdXm3/mT+DnseRJrqG8sDvHul/hiXw1CrU="
BETTER_AUTH_URL="https://votre-domaine.vercel.app"
NEXT_PUBLIC_APP_URL="https://votre-domaine.vercel.app"

# OAuth (si configuré)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

### Mettre à jour les URLs OAuth

N'oubliez pas de mettre à jour les **Authorized redirect URIs** dans :
- Google Cloud Console
- GitHub OAuth Apps

Avec votre URL de production :
```
https://votre-domaine.vercel.app/api/auth/callback/google
https://votre-domaine.vercel.app/api/auth/callback/github
```

---

## 📊 Structure de la Base de Données

Better Auth utilise ces tables :

- `users` - Informations utilisateurs
- `accounts` - Comptes OAuth liés
- `sessions` - Sessions actives
- `verification_tokens` - Tokens de vérification email

---

## 🆘 Dépannage

### Erreur : "Invalid session"

- Vérifiez que `BETTER_AUTH_SECRET` est défini
- Vérifiez que `BETTER_AUTH_URL` correspond à votre URL

### OAuth ne fonctionne pas

- Vérifiez les Client ID et Secret
- Vérifiez les URLs de callback
- Vérifiez que les APIs sont activées

### Utilisateur non créé

- Vérifiez la connexion à la base de données
- Vérifiez les logs dans la console
- Vérifiez que les tables existent dans Supabase

---

## 📚 Ressources

- [Better Auth Documentation](https://better-auth.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
