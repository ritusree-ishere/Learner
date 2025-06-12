'use client'
import { FinalExamQuizz } from '@/actions/FinalExamQuizz';
import dummyVideoLinks from '@/data/videos';
import { useUserDetails } from '@/zustand/firstphase';
import { useQuery } from '@tanstack/react-query';
import React, { Suspense, useState } from 'react'
import { toast } from 'sonner';
import QuizQuestion from './QuizzQuestions';
import FinalQuizQuestions from './FinalQuizzQuestions';

const FinalQuiz = ({ subject, }: { subject: string; }) => {


  const userClass = useUserDetails((state)=>state.class)
  const mainSubject = useUserDetails((state)=>state.subject)
  const video = dummyVideoLinks[userClass][mainSubject][subject]
  const videoId = extractVideoId(video[0])
if(!videoId){
  toast.dismiss('something went wrong')
}
  const { data: questions, error, isFetching } = useQuery<any>({
    queryKey: ['fetchQuestions'],
    queryFn: async () => await FinalExamQuizz(videoId,subject)
  });
  function extractVideoId(url: string) {
    try {
      const parsedUrl = new URL(url);
      // Expected pathname format: /embed/<videoId>
      const segments = parsedUrl.pathname.split('/');
      // The video ID should be the last segment (non-empty)
      const videoId = segments.filter(Boolean).pop();
      return videoId!
    } catch (error) {
      console.error('Invalid URL:', error);
     return 'XJFXMcpPKA8'
    }
  }

   if (isFetching) {
      return <div>Preparing Questions from the video....</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!questions || questions.length === 0) {
      return <div>No questions available</div>;
    }
  
    const handleQuizComplete = (score: number, attempted: number) => {
      toast.success(`Quiz completed. Score: ${score}, Attempted: ${attempted}`)
    
    };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Final Exam on {subject}</h2>
  
      <Suspense fallback={<div>Loading questions...</div>}>
        <FinalQuizQuestions questions={questions} onComplete={handleQuizComplete} />
      </Suspense>
     
    </div>
  )
}

export default FinalQuiz
