import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Завжди повертати масиви, навіть якщо даних нема
    const clientLogs = (await prisma.clientLog.findMany({
      orderBy: { timestamp: 'desc' }
    })) || [];

    const errorLogs = (await prisma.errorLog.findMany({
      orderBy: { timestamp: 'desc' }
    })) || [];

    return NextResponse.json({
      clientLogs,
      errorLogs
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}
