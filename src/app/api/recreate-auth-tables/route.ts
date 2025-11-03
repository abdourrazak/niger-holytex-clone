import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    
    if (token !== 'recreate-2024') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Supprimer toutes les tables d'auth
    await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "verification_tokens" CASCADE;`)
    await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "sessions" CASCADE;`)
    await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "accounts" CASCADE;`)
    await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "users" CASCADE;`)

    // Créer l'ENUM si nécessaire
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    // Recréer la table users avec TOUS les champs
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "users" (
        "id" TEXT NOT NULL,
        "name" TEXT,
        "email" TEXT NOT NULL,
        "emailVerified" TIMESTAMP(3),
        "image" TEXT,
        "password" TEXT,
        "role" "UserRole" NOT NULL DEFAULT 'USER',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "users_email_key" UNIQUE ("email")
      );
    `)

    // Recréer la table accounts
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "accounts" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "provider" TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        "refresh_token" TEXT,
        "access_token" TEXT,
        "expires_at" INTEGER,
        "token_type" TEXT,
        "scope" TEXT,
        "id_token" TEXT,
        "session_state" TEXT,
        CONSTRAINT "accounts_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "accounts_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId"),
        CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `)

    // Recréer la table sessions
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "sessions" (
        "id" TEXT NOT NULL,
        "sessionToken" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "sessions_pkey" PRIMARY KEY ("id"),
        "sessions_sessionToken_key" UNIQUE ("sessionToken"),
        CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `)

    // Recréer la table verification_tokens
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "verification_tokens" (
        "identifier" TEXT NOT NULL,
        "token" TEXT NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "verification_tokens_token_key" UNIQUE ("token"),
        CONSTRAINT "verification_tokens_identifier_token_key" UNIQUE ("identifier", "token")
      );
    `)

    // Créer les index
    await prisma.$executeRawUnsafe(`CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");`)
    await prisma.$executeRawUnsafe(`CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");`)

    // Vérifier les tables
    const tables = await prisma.$queryRaw`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `

    return NextResponse.json({
      success: true,
      message: 'Auth tables recreated successfully',
      tables,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST with token: "recreate-2024" to recreate auth tables',
    warning: 'This will DELETE all existing users!',
  })
}
