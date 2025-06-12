'use client'
import React, { useState } from 'react'
import AiQuiz from "@/components/core/AiQuiz"
import FinalQuiz from "@/components/core/final-quiz"
import VideoLectures from "@/components/core/video-lectures"
import { useDiffentPhase } from '@/zustand/firstphase'
import ResultPage from './Result'



const Main = ({id}:{id:string}) => {
    // const [phase, setPhase] = useState(1)
    const [aiScore, setAiScore] = useState(0)
  
   const phase = useDiffentPhase((state)=>state.phase)
  return (
    <div className="p-8 mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Welcome to {id} Learning Journey! 📚</h1>

      
      {phase === 1 && <AiQuiz subject={id} />}
      

      {phase === 2 && <VideoLectures subject={id} />}
      
      
      {phase === 3 && <FinalQuiz subject={id} />}
      {phase === 4 && <ResultPage subject={id} />}

    </div>
  )
}

export default Main