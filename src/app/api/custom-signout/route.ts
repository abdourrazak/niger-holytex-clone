import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    // Récupérer le token depuis les headers ou le body
    const authHeader = request.headers.get('authorization')
    let token = authHeader?.replace('Bearer ', '')

    if (!token) {
      const body = await request.json()
      token = body.sessionToken
    }

    if (!token) {
      return NextResponse.json(
        { error: 'No session token provided' },
        { status: 400 }
      )
    }

    // Supprimer la session
    await prisma.session.deleteMany({
      where: { sessionToken: token },
    })

    return NextResponse.json({
      success: true,
      message: 'Signed out successfully',
    })
  } catch (error: any) {
    console.error('[CUSTOM-SIGNOUT] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to sign out',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
