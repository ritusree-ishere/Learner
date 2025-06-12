'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Question } from "@/zustand/firstphase"
import { headers } from "next/headers"

interface SaveResultProps {
    subject:string
    videos:string[]
    score:number
    firstPhaseQuestions:Question[]
    Finalscore:number
    FinalPhaseQuestions:Question[]
    result:boolean
}

export async function SaveResult({subject,videos,score,firstPhaseQuestions,Finalscore,FinalPhaseQuestions,result}:SaveResultProps) {

      const session = await auth.api.getSession({
             headers:await headers(), 
        })
        // console.log(session)
        if (!session?.user?.id) {
            console.error("User ID not found in session");
            return {success:false}
        }
  
        const learning = await prisma.learnings.create({
            data:{
                userId:session.user.id,
                initialQuiz:JSON.stringify(firstPhaseQuestions),
                initialQuizScore:score,
                recommendedVideos:videos,
                finalExam:JSON.stringify(FinalPhaseQuestions),
                finalExamScore:Finalscore,
                result:result,
                status:result ?'COMPLETED':'FAILED'
            }
        })
        console.log(learning)
    return {success:true}
}