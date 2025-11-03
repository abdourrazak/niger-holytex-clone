# 🔐 Configuration OAuth - Google & GitHub

## 📋 Variables d'environnement requises

Ajoutez ces variables dans Vercel (Settings → Environment Variables) :

```env
NEXTAUTH_URL=https://niger-holytex.vercel.app
NEXTAUTH_SECRET=votre_secret_genere
GOOGLE_CLIENT_ID=votre_google_client_id
GOOGLE_CLIENT_SECRET=votre_google_client_secret
GITHUB_CLIENT_ID=votre_github_client_id
GITHUB_CLIENT_SECRET=votre_github_client_secret
```

---

## 🔑 1. Générer NEXTAUTH_SECRET

Dans votre terminal :
```bash
openssl rand -base64 32
```

Copiez le résultat et utilisez-le comme `NEXTAUTH_SECRET`

---

## 🔴 2. Configuration Google OAuth

### Étape 1 : Créer un projet Google Cloud
1. Allez sur : https://console.cloud.google.com/
2. Créez un nouveau projet ou sélectionnez-en un
3. Nom du projet : `Niger Holytex`

### Étape 2 : Activer Google+ API
1. Dans le menu, allez dans **APIs & Services** → **Library**
2. Cherchez "Google+ API"
3. Cliquez sur **Enable**

### Étape 3 : Créer les identifiants OAuth
1. Allez dans **APIs & Services** → **Credentials**
2. Cliquez sur **Create Credentials** → **OAuth client ID**
3. Si demandé, configurez l'écran de consentement OAuth :
   - Type d'application : **External**
   - Nom de l'application : `Niger Holytex`
   - Email d'assistance : votre email
   - Domaine autorisé : `niger-holytex.vercel.app`
   - Enregistrez

4. Créez l'OAuth client ID :
   - Type d'application : **Web application**
   - Nom : `Niger Holytex Web`
   - **Authorized JavaScript origins** :
     ```
     https://niger-holytex.vercel.app
     ```
   - **Authorized redirect URIs** :
     ```
     https://niger-holytex.vercel.app/api/auth/callback/google
     ```
   - Cliquez sur **Create**

5. **Copiez** :
   - `Client ID` → `GOOGLE_CLIENT_ID`
   - `Client Secret` → `GOOGLE_CLIENT_SECRET`

---

## ⚫ 3. Configuration GitHub OAuth

### Étape 1 : Créer une OAuth App
1. Allez sur : https://github.com/settings/developers
2. Cliquez sur **OAuth Apps** → **New OAuth App**

### Étape 2 : Remplir le formulaire
- **Application name** : `Niger Holytex`
- **Homepage URL** : `https://niger-holytex.vercel.app`
- **Authorization callback URL** :
  ```
  https://niger-holytex.vercel.app/api/auth/callback/github
  ```
- Cliquez sur **Register application**

### Étape 3 : Générer le Client Secret
1. Sur la page de votre app, cliquez sur **Generate a new client secret**
2. **Copiez** :
   - `Client ID` → `Ov23limfJS8RdDFc2QQU`
   - `Client Secret` → `94f0df672796b1c2857817b7ff5c172e48866e6d`

---

## ✅ 4. Ajouter dans Vercel

1. Allez sur : https://vercel.com/dashboard
2. Sélectionnez votre projet `niger-holytex-clone`
3. **Settings** → **Environment Variables**
4. Ajoutez les 6 variables (cochez Production, Preview, Development)
5. Redéployez l'application

---

## 🧪 5. Tester

1. Allez sur : https://niger-holytex.vercel.app/login
2. Cliquez sur **Continuer avec Google** ou **Continuer avec GitHub**
3. Autorisez l'application
4. Vous serez redirigé et connecté !

---

## 🔒 Sécurité

- ⚠️ Ne partagez JAMAIS vos Client Secrets
- ✅ Les secrets sont stockés de manière sécurisée dans Vercel
- ✅ Les utilisateurs ne voient jamais ces informations
