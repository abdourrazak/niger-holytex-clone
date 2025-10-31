import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {},
    database: {},
    auth: {},
  }

  // Check environment variables
  diagnostics.environment = {
    NODE_ENV: process.env.NODE_ENV,
    hasDbUrl: !!process.env.DATABASE_URL,
    dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 20) + '...',
    hasBetterAuthSecret: !!process.env.BETTER_AUTH_SECRET,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    nextPublicAppUrl: process.env.NEXT_PUBLIC_APP_URL,
  }

  // Test database connection
  const prisma = new PrismaClient()
  try {
    await prisma.$connect()
    
    // Count records in each table
    const [userCount, accountCount, sessionCount] = await Promise.all([
      prisma.user.count().catch(() => -1),
      prisma.account.count().catch(() => -1),
      prisma.session.count().catch(() => -1),
    ])

    diagnostics.database = {
      connected: true,
      tables: {
        users: userCount >= 0 ? `✅ ${userCount} records` : '❌ Table not found',
        accounts: accountCount >= 0 ? `✅ ${accountCount} records` : '❌ Table not found',
        sessions: sessionCount >= 0 ? `✅ ${sessionCount} records` : '❌ Table not found',
      },
    }
  } catch (error: any) {
    diagnostics.database = {
      connected: false,
      error: error.message,
    }
  } finally {
    await prisma.$disconnect()
  }

  // Check Better Auth configuration
  try {
    const { auth } = await import('@/lib/auth')
    diagnostics.auth = {
      configured: true,
      baseURL: auth.options?.baseURL || 'not set',
    }
  } catch (error: any) {
    diagnostics.auth = {
      configured: false,
      error: error.message,
    }
  }

  return NextResponse.json(diagnostics, { status: 200 })
}
