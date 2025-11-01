import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    console.log('[TEST-AUTH] Attempting to create user:', { email, name })

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer l'utilisateur directement avec Prisma
    const user = await prisma.user.create({
      data: {
        id: `user_${Date.now()}`,
        email,
        name,
        password: hashedPassword,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    console.log('[TEST-AUTH] User created successfully:', user.id)

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error: any) {
    console.error('[TEST-AUTH] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        meta: error.meta,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Lister tous les utilisateurs
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      count: users.length,
      users,
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
