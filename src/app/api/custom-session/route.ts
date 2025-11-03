import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    // Récupérer le token depuis les headers ou cookies
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'No session token provided' },
        { status: 401 }
      )
    }

    // Trouver la session
    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            image: true,
            createdAt: true,
          },
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session token' },
        { status: 401 }
      )
    }

    // Vérifier si la session a expiré
    if (session.expires < new Date()) {
      // Supprimer la session expirée
      await prisma.session.delete({
        where: { id: session.id },
      })

      return NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: session.user,
      session: {
        expires: session.expires,
      },
    })
  } catch (error: any) {
    console.error('[CUSTOM-SESSION] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to get session',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
