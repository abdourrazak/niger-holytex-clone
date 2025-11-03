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

    // Générer un token de vérification
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpiry = new Date(Date.now() + 24 * 3600000) // 24 heures

    // Supprimer les anciens tokens pour cet email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    })

    // Créer un nouveau token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationToken,
        expires: verificationTokenExpiry,
      },
    })

    // Créer l'URL de vérification
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`

    // Envoyer l'email
    const emailResult = await sendEmail({
      to: email,
      subject: 'Vérifiez votre email - Niger Holytex',
      html: getVerificationEmailTemplate(verificationUrl, user.name || undefined),
    })

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: emailResult.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully',
      // En dev, retourner l'URL
      verificationUrl: process.env.NODE_ENV === 'development' ? verificationUrl : undefined,
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
