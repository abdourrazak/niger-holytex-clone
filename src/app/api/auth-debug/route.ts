import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    // Get Better Auth configuration
    const config = {
      baseURL: auth.options?.baseURL,
      emailAndPassword: auth.options?.emailAndPassword,
      database: 'configured',
      secret: !!auth.options?.secret,
    }

    return NextResponse.json({
      success: true,
      config,
      message: 'Better Auth is configured',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    console.log('[AUTH-DEBUG] Attempting to create user:', { email, name })

    // Try to use Better Auth directly
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    })

    console.log('[AUTH-DEBUG] Result:', result)

    return NextResponse.json({
      success: true,
      result,
    })
  } catch (error: any) {
    console.error('[AUTH-DEBUG] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
