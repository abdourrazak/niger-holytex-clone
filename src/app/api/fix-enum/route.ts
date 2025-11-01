import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    
    if (token !== 'fix-enum-2024') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Créer l'ENUM UserRole
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    // Modifier la colonne role pour utiliser l'ENUM
    await prisma.$executeRawUnsafe(`
      ALTER TABLE users 
      ALTER COLUMN role TYPE "UserRole" 
      USING role::"UserRole";
    `)

    // Vérifier que l'ENUM existe
    const enums = await prisma.$queryRaw`
      SELECT typname, enumlabel 
      FROM pg_type t 
      JOIN pg_enum e ON t.oid = e.enumtypid  
      WHERE typname = 'UserRole';
    `

    return NextResponse.json({
      success: true,
      message: 'ENUM created successfully',
      enums,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        hint: 'The ENUM might already exist or the column type conversion failed',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST with token: "fix-enum-2024" to create UserRole ENUM',
  })
}
