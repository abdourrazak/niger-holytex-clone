import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    await prisma.$connect()
    const userCount = await prisma.user.count()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully',
      userCount,
      tables: {
        users: true,
        accounts: true,
        sessions: true,
      }
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: 'Could not connect to database'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
