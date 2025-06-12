'use client'
import FirstPhaseQuizz from '@/actions/firstPhaseQuizz';
import { useQuery } from '@tanstack/react-query';
import React, { Suspense, useState } from 'react'
import QuizQuestion from './QuizzQuestions';
import { useDiffentPhase } from '@/zustand/firstphase';

import { toast } from 'sonner';

const AiQuiz = ({ subject }: { subject: string; }) => {
  
  

  const { data: questions, error, isFetching } = useQuery<any>({
    queryKey: ['fetchQuestions'],
    queryFn: async () => await FirstPhaseQuizz(subject)
  });

  if (isFetching) {
    return <div>Loading...</div>;
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
    <div className="min-h-screen flex flex-col items-center gap-4 justify-center">
      
      <h2 className="text-2xl font-semibold mb-4">AI Knowledge Quiz on {subject}</h2>
      <p>Answer the AI-generated questions to test your current knowledge.</p>

      <Suspense fallback={<div>Loading questions...</div>}>
        <QuizQuestion questions={questions} onComplete={handleQuizComplete} />
      </Suspense>

     
    </div>
  );
};

export default AiQuiz;
