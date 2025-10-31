# 📚 Guide Git - Niger Holytex Clone

## 🔗 Repository GitHub
**URL** : https://github.com/abdourrazak/niger-holytex-clone

---

## 🚀 Commandes Git Essentielles

### Workflow Quotidien (3 étapes)

```bash
# 1. Voir les fichiers modifiés
git status

# 2. Ajouter et commiter
git add .
git commit -m "Description des changements"

# 3. Pousser vers GitHub
git push
```

---

## 📋 Commandes Détaillées

### Voir l'État du Projet

```bash
# Voir les fichiers modifiés
git status

# Voir les différences dans les fichiers
git diff

# Voir l'historique des commits
git log

# Voir l'historique en une ligne
git log --oneline

# Voir les 10 derniers commits
git log --oneline -10
```

### Ajouter des Fichiers

```bash
# Ajouter tous les fichiers modifiés
git add .

# Ajouter un fichier spécifique
git add chemin/vers/fichier.ts

# Ajouter tous les fichiers d'un dossier
git add src/components/
```

### Faire des Commits

```bash
# Commit simple
git commit -m "Message du commit"

# Commit avec description détaillée
git commit -m "Titre du commit" -m "Description détaillée"

# Modifier le dernier commit (avant push)
git commit --amend -m "Nouveau message"
```

### Pousser vers GitHub

```bash
# Pousser les changements
git push

# Pousser et créer une nouvelle branche sur GitHub
git push -u origin nom-de-la-branche

# Forcer le push (⚠️ Attention, écrase l'historique distant)
git push --force
```

### Récupérer les Changements

```bash
# Récupérer les changements depuis GitHub
git pull

# Récupérer sans merger
git fetch
```

---

## 🌿 Gestion des Branches

### Créer et Changer de Branche

```bash
# Voir toutes les branches
git branch

# Créer une nouvelle branche
git branch nom-de-la-branche

# Changer de branche
git checkout nom-de-la-branche

# Créer et changer de branche en une commande
git checkout -b nom-de-la-branche

# Revenir à la branche main
git checkout main
```

### Fusionner des Branches

```bash
# Fusionner une branche dans la branche actuelle
git merge nom-de-la-branche

# Supprimer une branche locale
git branch -d nom-de-la-branche

# Supprimer une branche distante
git push origin --delete nom-de-la-branche
```

---

## 🔄 Annuler des Changements

### Avant le Commit

```bash
# Annuler les modifications d'un fichier
git checkout -- chemin/vers/fichier.ts

# Retirer un fichier du staging (après git add)
git reset HEAD chemin/vers/fichier.ts

# Annuler tous les changements non commités
git reset --hard
```

### Après le Commit

```bash
# Annuler le dernier commit (garde les changements)
git reset --soft HEAD~1

# Annuler le dernier commit (supprime les changements)
git reset --hard HEAD~1

# Annuler les 3 derniers commits
git reset --hard HEAD~3
```

---

## 📦 Exemples de Messages de Commit

### Format Recommandé

```
<type>: <description courte>

<description détaillée optionnelle>
```

### Types de Commits

- ✨ `feat:` - Nouvelle fonctionnalité
- 🐛 `fix:` - Correction de bug
- 📝 `docs:` - Documentation
- 💄 `style:` - Style/UI (pas de changement de code)
- ♻️ `refactor:` - Refactoring du code
- ⚡ `perf:` - Amélioration des performances
- ✅ `test:` - Ajout de tests
- 🔧 `chore:` - Tâches de maintenance

### Exemples

```bash
git commit -m "✨ feat: Add product card component"
git commit -m "🐛 fix: Fix cart total calculation"
git commit -m "💄 style: Update header design"
git commit -m "📝 docs: Update README with installation steps"
git commit -m "♻️ refactor: Simplify authentication logic"
```

---

## 🆘 Commandes d'Urgence

### Problèmes Courants

```bash
# Oublié d'ajouter un fichier au dernier commit
git add fichier-oublie.ts
git commit --amend --no-edit

# Changer le message du dernier commit
git commit --amend -m "Nouveau message"

# Annuler un push (⚠️ Dangereux si d'autres ont pull)
git reset --hard HEAD~1
git push --force

# Résoudre un conflit de merge
# 1. Éditer les fichiers en conflit
# 2. git add .
# 3. git commit
```

### Nettoyer le Repository

```bash
# Supprimer les fichiers non suivis
git clean -fd

# Voir ce qui serait supprimé (sans supprimer)
git clean -n
```

---

## 🔍 Informations Utiles

### Configuration Git

```bash
# Voir la configuration
git config --list

# Configurer votre nom
git config --global user.name "Votre Nom"

# Configurer votre email
git config --global user.email "votre@email.com"

# Configurer l'éditeur par défaut
git config --global core.editor "code --wait"
```

### Voir les Remotes

```bash
# Voir les remotes configurés
git remote -v

# Ajouter un remote
git remote add origin https://github.com/username/repo.git

# Changer l'URL du remote
git remote set-url origin https://github.com/username/nouveau-repo.git
```

---

## 📊 Workflow Recommandé pour ce Projet

### Développement d'une Nouvelle Feature

```bash
# 1. Créer une branche pour la feature
git checkout -b feature/nom-de-la-feature

# 2. Développer et commiter régulièrement
git add .
git commit -m "✨ feat: Description"

# 3. Pousser la branche
git push -u origin feature/nom-de-la-feature

# 4. Créer une Pull Request sur GitHub

# 5. Après merge, revenir à main et mettre à jour
git checkout main
git pull
```

### Corrections Rapides

```bash
# 1. Créer une branche hotfix
git checkout -b hotfix/description-du-bug

# 2. Corriger et commiter
git add .
git commit -m "🐛 fix: Description du bug corrigé"

# 3. Pousser et merger rapidement
git push -u origin hotfix/description-du-bug
```

---

## 🎯 Bonnes Pratiques

1. ✅ **Commiter souvent** - Petits commits fréquents plutôt que gros commits rares
2. ✅ **Messages clairs** - Décrire ce qui a été fait, pas comment
3. ✅ **Tester avant de commiter** - S'assurer que le code fonctionne
4. ✅ **Utiliser des branches** - Ne pas travailler directement sur main
5. ✅ **Pull avant Push** - Toujours récupérer les derniers changements
6. ✅ **Pas de fichiers sensibles** - Vérifier le .gitignore (mots de passe, .env, etc.)

---

## 📞 Ressources

- [Documentation Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Repository** : https://github.com/abdourrazak/niger-holytex-clone
