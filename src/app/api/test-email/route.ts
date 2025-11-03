import { NextResponse } from 'next/server'
import { sendEmail, getVerificationEmailTemplate } from '@/lib/email'

export async function GET(request: Request) {
  try {
    // Récupérer l'email depuis l'URL
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required. Usage: /api/test-email?email=your@email.com' },
        { status: 400 }
      )
    }

    // Vérifier la configuration
    const config = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      emailFrom: process.env.EMAIL_FROM || 'Not configured',
      appUrl: process.env.NEXT_PUBLIC_APP_URL || 'Not configured',
    }

    // Envoyer un email de test
    const testCode = '123456'
    const result = await sendEmail({
      to: email,
      subject: 'Test - Code de vérification Niger Holytex',
      html: getVerificationEmailTemplate(testCode, 'Test User'),
    })

    return NextResponse.json({
      success: result.success,
      config,
      result,
      message: result.success 
        ? 'Email envoyé avec succès ! Vérifiez votre boîte mail.' 
        : 'Erreur lors de l\'envoi',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Test failed',
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    )
  }
}
