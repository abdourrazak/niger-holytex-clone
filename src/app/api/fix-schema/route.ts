import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    
    if (token !== 'fix-schema-2024') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Vérifier la structure actuelle de la table users
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'users'
      ORDER BY ordinal_position;
    `

    // Ajouter les colonnes manquantes si nécessaire
    const fixes = []

    // Better Auth peut avoir besoin de ces champs
    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE users ADD COLUMN IF NOT EXISTS "twoFactorEnabled" BOOLEAN DEFAULT false;
      `)
      fixes.push('Added twoFactorEnabled column')
    } catch (e: any) {
      fixes.push(`twoFactorEnabled: ${e.message}`)
    }

    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE users ADD COLUMN IF NOT EXISTS "banned" BOOLEAN DEFAULT false;
      `)
      fixes.push('Added banned column')
    } catch (e: any) {
      fixes.push(`banned: ${e.message}`)
    }

    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE users ADD COLUMN IF NOT EXISTS "banReason" TEXT;
      `)
      fixes.push('Added banReason column')
    } catch (e: any) {
      fixes.push(`banReason: ${e.message}`)
    }

    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE users ADD COLUMN IF NOT EXISTS "banExpires" TIMESTAMP(3);
      `)
      fixes.push('Added banExpires column')
    } catch (e: any) {
      fixes.push(`banExpires: ${e.message}`)
    }

    // Vérifier la structure finale
    const finalColumns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'users'
      ORDER BY ordinal_position;
    `

    return NextResponse.json({
      success: true,
      message: 'Schema check completed',
      initialColumns: columns,
      fixes,
      finalColumns,
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
    message: 'Use POST with token: "fix-schema-2024" to check and fix schema',
  })
}
