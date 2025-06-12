'use server'

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formSchema } from '@/schema/k12details';
import { headers } from 'next/headers';
import { z } from 'zod';

// Server Action
export async function saveK12Details(formData: z.infer<typeof formSchema>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), 
    });
    
    if (!session) {
      return { success: false,data:'user session not there' };
    }

    // Validate data
    const validatedData = formSchema.parse(formData);

    // Upsert: update if K12Details exists, otherwise create it.
    const updatedData = await prisma.k12Details.upsert({
      where: { userId: session.user.id },
      update: {
        city: validatedData.city,
        board: validatedData.board,
        grade: validatedData.grade,
        school: validatedData.school,
        stream: validatedData.stream,
        state: validatedData.state,
        country: validatedData.country,
      },
      create: {
        userId: session.user.id,
        school: validatedData.school,
        grade: validatedData.grade,
        board: validatedData.board,
        stream: validatedData.stream,
        city: validatedData.city,
        state: validatedData.state,
        country: validatedData.country,
      },
    });

    console.log(updatedData);
    return { success: true, data: updatedData };

  } catch (error) {
    console.error(error);
    return { success: false, message: error instanceof z.ZodError ? error.errors : error };
  }
}
