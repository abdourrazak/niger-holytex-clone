import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    // Vérifier un token de sécurité
    const { token } = await request.json()
    
    if (token !== 'migrate-now-2024') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Créer les tables via SQL brut
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT NOT NULL,
        "name" TEXT,
        "email" TEXT NOT NULL,
        "emailVerified" TIMESTAMP(3),
        "image" TEXT,
        "password" TEXT,
        "role" TEXT NOT NULL DEFAULT 'USER',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "users_email_key" UNIQUE ("email")
      );
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "accounts" (
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
        CONSTRAINT "accounts_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId")
      );
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "id" TEXT NOT NULL,
        "sessionToken" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "sessions_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "sessions_sessionToken_key" UNIQUE ("sessionToken")
      );
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "verification_tokens" (
        "identifier" TEXT NOT NULL,
        "token" TEXT NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "verification_tokens_token_key" UNIQUE ("token"),
        CONSTRAINT "verification_tokens_identifier_token_key" UNIQUE ("identifier", "token")
      );
    `)

    // Ajouter les foreign keys si elles n'existent pas
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" 
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      `)
    } catch (e) {
      // Ignore si déjà existe
    }

    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" 
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      `)
    } catch (e) {
      // Ignore si déjà existe
    }

    // Créer les index
    try {
      await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "accounts_userId_idx" ON "accounts"("userId");`)
      await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "sessions_userId_idx" ON "sessions"("userId");`)
    } catch (e) {
      // Ignore si déjà existe
    }

    // Vérifier que les tables existent
    const tables = await prisma.$queryRaw`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `

    return NextResponse.json({
      success: true,
      message: 'Migration completed',
      tables,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST with token: "migrate-now-2024" to run migrations',
  })
}
