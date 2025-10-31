# 🔧 Dépannage Authentification - Niger Holytex Clone

## ❌ Erreur : "Erreur lors de l'inscription" (500 Internal Server Error)

### Causes Possibles

1. **Variables d'environnement manquantes**
2. **Base de données non accessible**
3. **Prisma Client non généré**
4. **Tables manquantes dans la base de données**

### Solutions

#### 1. Vérifier les Variables d'Environnement

Assurez-vous que votre fichier `.env` ou `.env.local` contient :

```bash
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@db.zpfwzxpdccuculwsrafy.supabase.co:5432/postgres"
BETTER_AUTH_SECRET="pkccGrC5sDdXm3/mT+DnseRJrqG8sDvHul/hiXw1CrU="
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### 2. Régénérer Prisma Client

```bash
npx prisma generate
```

#### 3. Vérifier que les Tables Existent

Connectez-vous à Supabase et vérifiez que ces tables existent :
- `users`
- `accounts`
- `sessions`
- `verification_tokens`

Si elles n'existent pas, exécutez le SQL dans `migration.sql` via Supabase SQL Editor.

#### 4. Tester la Connexion à la Base de Données

Créez un fichier de test :

```typescript
// src/app/api/test-db/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    await prisma.$connect()
    const userCount = await prisma.user.count()
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected',
      userCount 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
```

Testez : http://localhost:3000/api/test-db

#### 5. Vérifier les Logs du Serveur

Regardez la console où vous avez lancé `npm run dev` pour voir les erreurs détaillées.

---

## ❌ Erreur : 404 sur `/api/auth/sign-in/social`

### Cause

Le client Better Auth ne trouve pas les routes API.

### Solution

1. **Vérifiez que le fichier existe** :
   ```
   src/app/api/auth/[...all]/route.ts
   ```

2. **Redémarrez le serveur** :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   npm run dev
   ```

3. **Vérifiez la configuration du client** :
   ```typescript
   // src/lib/auth-client.ts
   export const authClient = createAuthClient({
     baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
   })
   ```

---

## ❌ Erreur : "Can't reach database server"

### Cause

Prisma ne peut pas se connecter à Supabase.

### Solution

1. **Vérifiez que votre projet Supabase est actif** (pas en pause)

2. **Testez la connexion** :
   ```bash
   npx prisma db pull
   ```

3. **Si l'erreur persiste**, utilisez l'interface Supabase pour créer les tables manuellement avec le fichier `migration.sql`

---

## ✅ Checklist de Vérification

Avant de tester l'authentification, vérifiez :

- [ ] Le fichier `.env` ou `.env.local` existe et contient toutes les variables
- [ ] `npx prisma generate` a été exécuté sans erreur
- [ ] Les tables existent dans Supabase (vérifiez dans Table Editor)
- [ ] Le serveur de développement est lancé (`npm run dev`)
- [ ] Aucune erreur dans la console du serveur
- [ ] Le fichier `src/app/api/auth/[...all]/route.ts` existe

---

## 🧪 Tests de Diagnostic

### Test 1 : API Auth

Ouvrez : http://localhost:3000/api/auth/test

Vous devriez voir :
```json
{
  "message": "Auth API is working",
  "env": {
    "hasSecret": true,
    "hasDbUrl": true,
    "baseUrl": "http://localhost:3000"
  }
}
```

### Test 2 : Base de Données

Créez le fichier de test mentionné ci-dessus et testez la connexion.

### Test 3 : Inscription Simple

1. Ouvrez la console du navigateur (F12)
2. Allez sur `/register`
3. Remplissez le formulaire
4. Regardez les erreurs dans la console

---

## 📝 Commandes Utiles

```bash
# Régénérer Prisma Client
npx prisma generate

# Voir le schéma de la base de données
npx prisma db pull

# Ouvrir Prisma Studio (interface graphique)
npx prisma studio

# Redémarrer le serveur
npm run dev

# Voir les logs en temps réel
# (dans la console où vous avez lancé npm run dev)
```

---

## 🆘 Si Rien ne Fonctionne

1. **Supprimez `node_modules` et réinstallez** :
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Régénérez Prisma** :
   ```bash
   npx prisma generate
   ```

3. **Redémarrez le serveur** :
   ```bash
   npm run dev
   ```

4. **Vérifiez les permissions** :
   - Assurez-vous que votre utilisateur a accès à la base de données Supabase
   - Vérifiez que le mot de passe dans `DATABASE_URL` est correct

---

## 📞 Besoin d'Aide ?

Si le problème persiste :

1. Vérifiez les logs du serveur dans la console
2. Vérifiez les logs dans Supabase (Logs → API Logs)
3. Testez la connexion à la base de données avec un client PostgreSQL

---

**Note** : La plupart des erreurs viennent de variables d'environnement manquantes ou d'une base de données non accessible. Vérifiez toujours ces deux points en premier.
