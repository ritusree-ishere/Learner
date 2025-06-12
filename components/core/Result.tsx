'use client'
import React from 'react'
import { useDiffentPhase, useFinalPhaseQuizStore, useFirstPhaseQuizStore, useUserDetails } from '@/zustand/firstphase'
import { YouTubeVideoCardPlayer } from './YouTubeVideoCardPlayer'
import { dummyVideoLinks } from '@/data/videos'
import { useQuery } from '@tanstack/react-query'
import { SaveResult } from '@/actions/SaveResult'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { redirect } from 'next/navigation'

interface ResultPageProps {
  subject: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ subject }) => {
  // Get user class and subject from Zustand
  const userClass = useUserDetails((state) => state.class)
  const mainSubject = useUserDetails((state) => state.subject)
  const sub = mainSubject || 'Science'

  // Get diffent phase details if needed
  const increment = useDiffentPhase((state) => state.increment)
  const phase = useDiffentPhase((state) => state.phase)

  // Get the array of video links for the specific class/subject/topic
  const videos = dummyVideoLinks[userClass]?.[sub]?.[subject] || []

  // Get first phase and final phase quiz results from the store
  const score = useFirstPhaseQuizStore((state) => state.score)
  const firstPhaseQuestions = useFirstPhaseQuizStore((state) => state.questions)
  const Finalscore = useFinalPhaseQuizStore((state) => state.score)
  const FinalPhaseQuestions = useFinalPhaseQuizStore((state) => state.questions)
  // Consider 50% passing score
  const result = FinalPhaseQuestions.length > 0 ? (Finalscore / FinalPhaseQuestions.length) * 100 >= 50 : false

  // Save the result in the backend using react-query.
  const { data: response, error, isFetching } = useQuery<any>({
    queryKey: ['fetchQuestions'],
    queryFn: async () =>
      await SaveResult({
        subject,
        videos,
        score,
        firstPhaseQuestions,
        Finalscore,
        FinalPhaseQuestions,
        result,
      }),
  })

  if (isFetching) {
    return <div className="py-10 text-center">Loading...</div>
  }

  if (error) {
    return <div className="py-10 text-center">Error: {error.message}</div>
  }

  if (response?.success) {
    toast.success('Your Academics are saved')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Quiz Results</h1>
        <div className="border p-4 rounded">
          <h2 className="text-2xl font-semibold text-center">Entrance Exam</h2>
          <p className="text-xl text-center">
            You have scored {score} out of {firstPhaseQuestions.length}
          </p>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-2xl font-semibold text-center">Final Exam - {subject}</h2>
          <p className="text-xl text-center">
            You have scored {Finalscore} out of {FinalPhaseQuestions.length}
          </p>
          <p className="text-xl text-center">
            Final Result: {result ? 'Passed' : 'Failed'}
          </p>
        </div>
        {videos.length > 0 && (
          <div className="border p-4 rounded">
            <h2 className="text-2xl font-semibold text-center">Watch Related Videos</h2>
            <YouTubeVideoCardPlayer videoLinks={videos} />
          </div>
        )}

        <Button className='bg-blue-400' onClick={()=>{redirect('/dashboard')}}>Back Home</Button>
      </div>
    </div>
  )
}

export default ResultPage
