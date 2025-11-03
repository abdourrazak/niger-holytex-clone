import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { code, email } = await request.json()

    if (!code || !email) {
      return NextResponse.json(
        { error: 'Code and email are required' },
        { status: 400 }
      )
    }

    // Vérifier le code pour cet email
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { 
        identifier: email,
        token: code 
      },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Vérifier si le code n'a pas expiré
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { token: code },
      })

      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 400 }
      )
    }

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Marquer l'email comme vérifié
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
      },
    })

    // Supprimer le code utilisé
    await prisma.verificationToken.delete({
      where: { token: code },
    })

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    })
  } catch (error: any) {
    console.error('[VERIFY-EMAIL] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to verify email',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
