import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check environment variables
    const dbUrl = process.env.DATABASE_URL
    const directUrl = process.env.DIRECT_URL
    
    // Get connection info without exposing passwords
    const dbUrlInfo = dbUrl ? {
      provider: dbUrl.split(':')[0],
      host: dbUrl.split('@')[1]?.split('/')[0] || 'unknown',
      hasPassword: dbUrl.includes(':') && dbUrl.split(':').length > 2,
    } : null

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      database: {
        hasDatabaseUrl: !!dbUrl,
        hasDirectUrl: !!directUrl,
        connectionInfo: dbUrlInfo,
        databaseUrlPrefix: dbUrl?.substring(0, 30) + '...',
      },
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
