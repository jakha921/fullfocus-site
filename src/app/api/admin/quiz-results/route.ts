import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await prisma.quizResult.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(results);
}
