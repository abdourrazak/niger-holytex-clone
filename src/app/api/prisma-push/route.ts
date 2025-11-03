import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    
    if (token !== 'push-now-2024') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const results = []

    // 1. Supprimer toutes les anciennes tables
    try {
      await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "verification_tokens" CASCADE;`)
      await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "sessions" CASCADE;`)
      await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "accounts" CASCADE;`)
      await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "users" CASCADE;`)
      await prisma.$executeRawUnsafe(`DROP TYPE IF EXISTS "UserRole" CASCADE;`)
      results.push('Dropped old tables')
    } catch (e: any) {
      results.push(`Drop tables: ${e.message}`)
    }

    // 2. Créer l'ENUM UserRole
    try {
      await prisma.$executeRawUnsafe(`CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');`)
      results.push('Created UserRole ENUM')
    } catch (e: any) {
      results.push(`Create ENUM: ${e.message}`)
    }

    // 3. Créer la table users - EXACTEMENT comme Prisma l'attend
    try {
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
          "updatedAt" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "users_pkey" PRIMARY KEY ("id")
        );
      `)
      
      await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "users_email_key" ON "users"("email");`)
      results.push('Created users table')
    } catch (e: any) {
      results.push(`Create users: ${e.message}`)
    }

    // 4. Créer la table accounts
    try {
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
          CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
        );
      `)
      
      await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");`)
      await prisma.$executeRawUnsafe(`CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");`)
      await prisma.$executeRawUnsafe(`ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;`)
      results.push('Created accounts table')
    } catch (e: any) {
      results.push(`Create accounts: ${e.message}`)
    }

    // 5. Créer la table sessions
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE "sessions" (
          "id" TEXT NOT NULL,
          "sessionToken" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "expires" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
        );
      `)
      
      await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");`)
      await prisma.$executeRawUnsafe(`CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");`)
      await prisma.$executeRawUnsafe(`ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;`)
      results.push('Created sessions table')
    } catch (e: any) {
      results.push(`Create sessions: ${e.message}`)
    }

    // 6. Créer la table verification_tokens
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE "verification_tokens" (
          "identifier" TEXT NOT NULL,
          "token" TEXT NOT NULL,
          "expires" TIMESTAMP(3) NOT NULL
        );
      `)
      
      await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");`)
      await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");`)
      results.push('Created verification_tokens table')
    } catch (e: any) {
      results.push(`Create verification_tokens: ${e.message}`)
    }

    // 7. Créer un trigger pour updatedAt automatique
    try {
      await prisma.$executeRawUnsafe(`
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW."updatedAt" = CURRENT_TIMESTAMP;
          RETURN NEW;
        END;
        $$ language 'plpgsql';
      `)
      
      await prisma.$executeRawUnsafe(`
        CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      `)
      results.push('Created updatedAt trigger')
    } catch (e: any) {
      results.push(`Create trigger: ${e.message}`)
    }

    // 8. Vérifier les tables
    const tables = await prisma.$queryRaw`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `

    return NextResponse.json({
      success: true,
      message: 'Database schema recreated with Prisma-compatible structure',
      results,
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
    message: 'Use POST with token: "push-now-2024" to recreate database schema',
    warning: 'This will DELETE ALL DATA!',
  })
}
