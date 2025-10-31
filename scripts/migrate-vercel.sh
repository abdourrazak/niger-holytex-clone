#!/bin/bash
# Script pour migrer la base de données Vercel Postgres

echo "🔄 Running Prisma migrations on Vercel Postgres..."

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push --accept-data-loss

echo "✅ Migration complete!"
