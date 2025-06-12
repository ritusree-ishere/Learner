'use server'

import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { prisma } from "@/lib/prisma"
import { formSchema } from "@/schema/k12details"
import { headers } from "next/headers"
import {z} from 'zod'

export default async function userDetails(){
    const session = await auth.api.getSession({
         headers:await headers(), 
    })
    // console.log(session)
    if (!session?.user?.id) {
        console.error("User ID not found in session");
        return null
      }
    const user = await prisma.k12Details.findUnique({
        where:{
            userId:session.user.id
        },
    
    })
  
      
    return user
}