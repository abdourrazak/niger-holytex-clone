import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    // Obtenir les informations de configuration Better Auth
    const config = {
      baseURL: auth.options?.baseURL,
      emailAndPassword: {
        enabled: auth.options?.emailAndPassword?.enabled,
        requireEmailVerification: auth.options?.emailAndPassword?.requireEmailVerification,
        minPasswordLength: auth.options?.emailAndPassword?.minPasswordLength,
      },
      database: 'configured',
    }

    return NextResponse.json({
      success: true,
      config,
      message: 'Better Auth configuration',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    )
  }
}
