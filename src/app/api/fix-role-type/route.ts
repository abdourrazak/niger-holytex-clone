import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    
    if (token !== 'fix-role-2024') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Convertir la colonne role de ENUM à TEXT
    await prisma.$executeRawUnsafe(`
      ALTER TABLE users ALTER COLUMN role DROP DEFAULT;
    `)
    
    await prisma.$executeRawUnsafe(`
      ALTER TABLE users ALTER COLUMN role TYPE TEXT USING role::TEXT;
    `)
    
    await prisma.$executeRawUnsafe(`
      ALTER TABLE users ALTER COLUMN role SET DEFAULT 'USER';
    `)

    // Vérifier le type de la colonne
    const columnInfo = await prisma.$queryRaw`
      SELECT column_name, data_type, column_default
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'role';
    `

    return NextResponse.json({
      success: true,
      message: 'Role column converted to TEXT',
      columnInfo,
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
    message: 'Use POST with token: "fix-role-2024" to convert role column to TEXT',
  })
}
