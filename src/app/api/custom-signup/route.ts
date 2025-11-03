import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { sendEmail, getVerificationEmailTemplate } from '@/lib/email'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name: name || null,
        password: hashedPassword,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    // Créer une session
    const session = await prisma.session.create({
      data: {
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sessionToken: `token_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
        userId: user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
      },
    })

    // Générer et envoyer le code de vérification
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

    // Envoyer l'email avec le code (en arrière-plan, ne pas bloquer la réponse)
    sendEmail({
      to: email,
      subject: 'Code de vérification - Niger Holytex',
      html: getVerificationEmailTemplate(verificationCode, user.name || undefined),
    }).catch(err => {
      console.error('[SIGNUP] Failed to send verification email:', err)
    })

    return NextResponse.json({
      success: true,
      user,
      session: {
        sessionToken: session.sessionToken,
        expires: session.expires,
      },
      verificationCodeSent: true,
      // En dev, retourner le code
      verificationCode: process.env.NODE_ENV === 'development' ? verificationCode : undefined,
    })
  } catch (error: any) {
    console.error('[CUSTOM-SIGNUP] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create user',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
