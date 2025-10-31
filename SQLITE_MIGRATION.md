# 🔄 Migration vers SQLite - Résolution du Problème

## Problème Actuel

Better Auth retourne une erreur 422 `FAILED_TO_CREATE_USER` lors de l'inscription.

## Cause Probable

Better Auth pour SQLite nécessite une structure de table spécifique qui peut différer de notre schéma Prisma actuel.

## Solution : Utiliser le Schéma Better Auth pour SQLite

Better Auth a besoin de ces tables avec des champs spécifiques :

### Table `user`
```sql
CREATE TABLE user (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    emailVerified INTEGER NOT NULL DEFAULT 0,
    name TEXT,
    image TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
);
```

### Table `session`
```sql
CREATE TABLE session (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    expiresAt INTEGER NOT NULL,
    ipAddress TEXT,
    userAgent TEXT,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);
```

### Table `account`
```sql
CREATE TABLE account (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    accountId TEXT NOT NULL,
    providerId TEXT NOT NULL,
    accessToken TEXT,
    refreshToken TEXT,
    idToken TEXT,
    expiresAt INTEGER,
    password TEXT,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);
```

### Table `verification`
```sql
CREATE TABLE verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expiresAt INTEGER NOT NULL
);
```

## Différences avec notre Schéma

1. **Noms de tables** : Better Auth utilise `user` (singulier) au lieu de `users` (pluriel)
2. **Champs de date** : Better Auth utilise `INTEGER` (timestamps) au lieu de `DATETIME`
3. **emailVerified** : Better Auth utilise `INTEGER` (0/1) au lieu de `DATETIME`
4. **Structure de session** : Différente de notre schéma

## Actions à Faire

### Option 1 : Adapter le Schéma Prisma pour Better Auth

Modifier `prisma/schema.prisma` pour correspondre exactement à ce que Better Auth attend.

### Option 2 : Utiliser Better Auth sans Prisma

Laisser Better Auth créer ses propres tables.

### Option 3 : Mapper les Champs

Configurer Better Auth pour utiliser notre schéma existant avec un mapping personnalisé.

---

## Recommandation

**Option 1** est la meilleure : adapter notre schéma Prisma pour correspondre aux attentes de Better Auth.
