import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request): Promise<NextResponse> {
  try {

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    const { errorMessage, stackTrace, path, timestamp } = body;

    console.log(errorMessage, stackTrace, path, timestamp);
    

    if (errorMessage === null || errorMessage === undefined ||
        path === null || path === undefined ||
        timestamp === null || timestamp === undefined) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }


    const formattedTimestamp = new Date(timestamp).toISOString();


    const log = await prisma.errorLog.create({
      data: {
        error_message: errorMessage,
        stack_trace: stackTrace ?? null, 
        path,
        timestamp: formattedTimestamp,
      },
    });

    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    console.error('Error logging error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
