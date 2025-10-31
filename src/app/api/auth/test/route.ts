import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Auth API is working',
    env: {
      hasSecret: !!process.env.BETTER_AUTH_SECRET,
      hasDbUrl: !!process.env.DATABASE_URL,
      baseUrl: process.env.BETTER_AUTH_URL || 'not set',
    },
  })
}
