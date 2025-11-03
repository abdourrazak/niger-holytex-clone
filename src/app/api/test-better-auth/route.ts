import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    console.log('[TEST-BETTER-AUTH] Attempting to sign up:', { email, name })

    // Essayer de créer un utilisateur via l'API Better Auth
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    })

    console.log('[TEST-BETTER-AUTH] Success:', result)

    return NextResponse.json({
      success: true,
      message: 'User created via Better Auth',
      result,
    })
  } catch (error: any) {
    console.error('[TEST-BETTER-AUTH] Error:', error)
    console.error('[TEST-BETTER-AUTH] Error stack:', error.stack)
    console.error('[TEST-BETTER-AUTH] Error cause:', error.cause)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        name: error.name,
        code: error.code,
        cause: error.cause?.message || error.cause,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST with {email, password, name} to test Better Auth signup',
  })
}
