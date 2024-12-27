import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const log = await prisma.log.create({
      data: {
        type: body.type,
        message: body.message,
        metadata: body.metadata ? JSON.stringify(body.metadata) : null,
        parentId: body.parentId,
      },
    });
    return NextResponse.json(log);
  } catch (error) {
    console.error('Failed to create log:', error);
    return NextResponse.json({ error: 'Failed to create log' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    
    // const where = type ? { type } : {};
    
    const logs = await prisma.log.findMany({
      // where,
      orderBy: { timestamp: 'desc' },
      include: {
        children: true,
      },
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error('Failed to fetch logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await prisma.log.deleteMany();
    return NextResponse.json({ message: 'Logs cleared successfully' });
  } catch (error) {
    console.error('Failed to clear logs:', error);
    return NextResponse.json({ error: 'Failed to clear logs' }, { status: 500 });
  }
}