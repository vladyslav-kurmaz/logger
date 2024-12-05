
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Prisma інстанс для доступу до БД

export async function POST(request: Request) {
  const { actionType, data, path, timestamp } = await request.json();

  try {
    const log = await prisma.clientLog.create({
      data: {
        actionType,
        data,
        path,
        timestamp,
      },
    });

    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    console.error('Error logging action:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}