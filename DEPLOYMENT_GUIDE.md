# 🚀 Guide de Déploiement Vercel + Supabase

## 📋 Résumé

- **Développement Local** : Impossible (réseau bloque Supabase)
- **Production** : Vercel + Supabase ✅
- **Solution** : Déployer directement sur Vercel sans tester en local

---

## ✅ Pré-requis

- [x] Code poussé sur GitHub
- [x] Compte Vercel
- [x] Compte Supabase avec base de données configurée
- [x] Tables créées dans Supabase (via `migration.sql`)

---

## 🎯 Étapes de Déploiement

### 1. Préparer le Code

```bash
# Vérifier que tout est commité
git status

# Si des changements existent
git add .
git commit -m "🚀 Ready for production deployment"
git push
```

### 2. Déployer sur Vercel

#### A. Via l'Interface Web

1. **Allez sur** : https://vercel.com/new
2. **Import Git Repository** : Sélectionnez `niger-holytex-clone`
3. **Configure Project** :
   - Framework Preset : **Next.js** (détecté automatiquement)
   - Root Directory : `./`
   - Build Command : `npm run build`
   - Output Directory : `.next`

4. **Environment Variables** - Ajoutez :

```env
DATABASE_URL=postgresql://postgres:693098877Ab@db.zpfwzxpdccuculwsrafy.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1

DIRECT_URL=postgresql://postgres:693098877Ab@db.zpfwzxpdccuculwsrafy.supabase.co:5432/postgres

BETTER_AUTH_SECRET=pkccGrC5sDdXm3/mT+DnseRJrqG8sDvHul/hiXw1CrU=

BETTER_AUTH_URL=https://VOTRE-APP.vercel.app

NEXT_PUBLIC_APP_URL=https://VOTRE-APP.vercel.app
```

5. **Deploy** : Cliquez sur "Deploy"

#### B. Via CLI (Alternative)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions
```

### 3. Après le Premier Déploiement

1. **Récupérez l'URL** de votre app (ex: `https://niger-holytex-clone.vercel.app`)

2. **Mettez à jour les variables d'environnement** :
   - Allez dans **Settings** → **Environment Variables**
   - Modifiez `BETTER_AUTH_URL` et `NEXT_PUBLIC_APP_URL` avec votre vraie URL
   - Exemple : `https://niger-holytex-clone.vercel.app`

3. **Redéployez** :
   - Allez dans **Deployments**
   - Cliquez sur les 3 points du dernier déploiement
   - Cliquez sur "Redeploy"

### 4. Vérifier le Déploiement

Testez ces URLs :

- ✅ `https://votre-app.vercel.app` - Page d'accueil
- ✅ `https://votre-app.vercel.app/register` - Inscription
- ✅ `https://votre-app.vercel.app/login` - Connexion
- ✅ `https://votre-app.vercel.app/api/debug` - Diagnostic

---

## 🔧 Configuration OAuth (Optionnel)

### Google OAuth

1. **Google Cloud Console** : https://console.cloud.google.com
2. **Credentials** → **OAuth 2.0 Client IDs**
3. **Authorized redirect URIs** :
   ```
   https://votre-app.vercel.app/api/auth/callback/google
   ```
4. **Ajoutez sur Vercel** :
   ```
   GOOGLE_CLIENT_ID=votre-client-id
   GOOGLE_CLIENT_SECRET=votre-client-secret
   ```

### GitHub OAuth

1. **GitHub Settings** : https://github.com/settings/developers
2. **OAuth Apps** → **New OAuth App**
3. **Authorization callback URL** :
   ```
   https://votre-app.vercel.app/api/auth/callback/github
   ```
4. **Ajoutez sur Vercel** :
   ```
   GITHUB_CLIENT_ID=votre-client-id
   GITHUB_CLIENT_SECRET=votre-client-secret
   ```

---

## 🐛 Dépannage

### Erreur : "Can't reach database server"

- Vérifiez que votre projet Supabase est actif (pas en pause)
- Vérifiez les variables `DATABASE_URL` et `DIRECT_URL`

### Erreur : "BETTER_AUTH_SECRET is required"

- Vérifiez que toutes les variables d'environnement sont ajoutées sur Vercel
- Redéployez après avoir ajouté les variables

### Erreur 500 sur /api/auth/sign-up/email

- Vérifiez les logs dans Vercel : **Deployments** → **Functions**
- Vérifiez que les tables existent dans Supabase
- Vérifiez la connexion à la base de données

### OAuth ne fonctionne pas

- Vérifiez les URLs de callback
- Vérifiez que les Client ID et Secret sont corrects
- Redéployez après avoir ajouté les variables OAuth

---

## 📊 Monitoring

### Logs Vercel

- **Deployments** → Sélectionnez un déploiement → **Functions**
- Voir les logs en temps réel

### Logs Supabase

- **Dashboard Supabase** → **Logs** → **API Logs**
- Voir les requêtes à la base de données

---

## 🔄 Mises à Jour

Pour déployer une nouvelle version :

```bash
# Faire vos modifications
git add .
git commit -m "✨ New feature"
git push

# Vercel déploiera automatiquement !
```

---

## ✅ Checklist Finale

Avant de considérer le déploiement comme terminé :

- [ ] L'application se charge sur Vercel
- [ ] L'inscription fonctionne
- [ ] La connexion fonctionne
- [ ] L'utilisateur connecté s'affiche dans le header
- [ ] La déconnexion fonctionne
- [ ] Les données sont bien sauvegardées dans Supabase

---

## 🎉 Félicitations !

Votre application Niger Holytex est maintenant en ligne ! 🚀

**URL de production** : https://votre-app.vercel.app

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs Vercel
2. Vérifiez les logs Supabase
3. Vérifiez que toutes les variables d'environnement sont correctes
