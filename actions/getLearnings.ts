// File: actions/getLearnings.ts
'use server'

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getLearnings(page: number, limit: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), 
    });
    if (!session) {
      throw new Error("No session found");
    }
    
    // Calculate the number of records to skip
    const skip = (page - 1) * limit;
    
    // Fetch paginated learning records for the current user.
    const [records, total] = await Promise.all([
      prisma.learnings.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.learnings.count({ where: { userId: session.user.id } }),
    ]);
    
    return { success: true, data: records, total, page, limit };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
