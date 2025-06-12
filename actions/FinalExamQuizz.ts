'use server'
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { headers } from 'next/headers';
import {getSubtitles} from 'youtube-captions-scraper'

export async function FinalExamQuizz(id:string,subject:string) {
    console.log('called')
      const session = await auth.api.getSession({
             headers:await headers(), 
        })
        if(!session) return
        const user = await prisma.k12Details.findUnique({
            where:{
                userId:session.user.id
            },
        
        })
    // const captions = await getSubtitles({
    //     videoID: id,
    //     lang: 'en', 
    
    // });
    // const textCaptions = captions.map((caption) => caption.text).join('\n');
    // console.log(textCaptions)

        const prompt = `generate 5 quizz questions for the subject ${subject} of class ${user?.grade} of board ${user?.board} ${user?.state} state this is to test the user on there knowlage on the topic that they have not leaned yet
        give me the data in the following formate.Provide only the array without any other things. Give me exactly like this format without any changes in the format here is the example for the physics subject, [
        { question: 'What is the SI unit of force?', options: ['Watt', 'Joule', 'Newton', 'Pascal'], correct: 2, fact: 'The SI unit of force is the Newton, named after Sir Isaac Newton.' },
        { question: 'What is the speed of light?', options: ['3x10^8 m/s', '3x10^6 m/s', '3x10^10 m/s', '3x10^5 m/s'], correct: 0, fact: 'The speed of light in vacuum is approximately 3x10^8 meters per second.' },
      ] 
        `
        
    
    
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text())
    const  convertAIOutputToArray = (aiOutput: string )=> {
      try {
        const cleanedOutput = aiOutput
          .replace(/```json/g, '') // Remove markdown JSON start
          .replace(/```/g, '') // Remove markdown end
          .trim(); // Trim extra spaces
    
        return JSON.parse(cleanedOutput);
      } catch (error) {
        console.error("Error parsing AI output:", error);
        return []
        
      }
    }
    
    try {
        
        const Fresult = convertAIOutputToArray(result.response.text())
        console.log('after resfactor',Fresult)
        return Fresult
    } catch (error) {
        console.error("Error parsing AI output:", error);
        return []
    }
    
    

}