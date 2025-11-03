import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { sendEmail, getVerificationEmailTemplate } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Si déjà vérifié
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email already verified' },
        { status: 400 }
      )
    }

    // Générer un code de vérification à 6 chiffres
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verificationTokenExpiry = new Date(Date.now() + 15 * 60000) // 15 minutes

    // Supprimer les anciens codes pour cet email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    })

    // Créer un nouveau code
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationCode,
        expires: verificationTokenExpiry,
      },
    })

    // Envoyer l'email avec le code
    const emailResult = await sendEmail({
      to: email,
      subject: 'Code de vérification - Niger Holytex',
      html: getVerificationEmailTemplate(verificationCode, user.name || undefined),
    })

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: emailResult.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully',
      // En dev, retourner le code
      verificationCode: process.env.NODE_ENV === 'development' ? verificationCode : undefined,
    })
  } catch (error: any) {
    console.error('[SEND-VERIFICATION] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send verification email',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
