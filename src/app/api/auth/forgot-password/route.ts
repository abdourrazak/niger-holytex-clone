import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { sendEmail, getPasswordResetEmailTemplate } from '@/lib/email'

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

    // Pour des raisons de sécurité, on retourne toujours un succès
    // même si l'email n'existe pas (pour éviter l'énumération d'emails)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'Si cet email existe, un lien de réinitialisation a été envoyé',
      })
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 heure

    // Stocker le token dans la table VerificationToken
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: resetToken,
        expires: resetTokenExpiry,
      },
    })

    // Envoyer l'email avec le lien de réinitialisation
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

    // Envoyer l'email
    await sendEmail({
      to: email,
      subject: 'Réinitialisation de votre mot de passe - Niger Holytex',
      html: getPasswordResetEmailTemplate(resetUrl, user.name || undefined),
    })

    return NextResponse.json({
      success: true,
      message: 'Si cet email existe, un lien de réinitialisation a été envoyé',
      // En développement, retourner l'URL
      resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined,
    })
  } catch (error: any) {
    console.error('[FORGOT-PASSWORD] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process request',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
