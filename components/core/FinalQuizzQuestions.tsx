import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { create } from 'zustand';
import { useDiffentPhase, useFinalPhaseQuizStore, useFirstPhaseQuizStore } from '@/zustand/firstphase';

// Define the structure of a quiz question.
interface Question {
  category?: string;
  question: string;
  options: string[];
  correct: number;
  fact?: string;
}



interface QuizQuestionProps {
  questions: Question[];
  onComplete: (score: number, attempted: number) => void;
}

const FinalQuizQuestions: React.FC<QuizQuestionProps> = ({ questions, onComplete }) => {
  const {
    currentQuestion,
    userAnswers,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    initialize,
  } = useFinalPhaseQuizStore();

  // Initialize the store's answers array when the questions are loaded.
  useEffect(() => {
    if (questions.length > 0) {
      initialize(questions);
    }
  }, [questions, initialize]);

  // Get the selected answer for the current question.
  const selectedAnswer = userAnswers[currentQuestion];

  const increment = useDiffentPhase((state) => state.increment);
  const phase = useDiffentPhase((state) => state.phase);
  const score = useFirstPhaseQuizStore((state)=>state.score)
  console.log(phase)

  return (
    <div className="w-full max-w-md p-6 border rounded-lg shadow-md">
      {/* Header: Display quiz category and progress */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold capitalize">
          {questions[currentQuestion]?.category || 'Quiz'} Quiz
        </h3>
        <div className="px-3 py-1 bg-green-400 rounded-full text-sm">
          Question {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      {/* Display current question */}
      <div className="mb-4">
        <p className="text-lg">{questions[currentQuestion]?.question}</p>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {questions[currentQuestion]?.options.map((option, index) => {
          // Set default option styling.
          let optionClasses = 'p-3 rounded-lg border cursor-pointer hover:bg-blue-500';
          // Once an answer is selected, reveal correct answer styling.
          if (selectedAnswer != null) {
            optionClasses =
              index === questions[currentQuestion].correct
                ? 'p-3 rounded-lg border bg-green-100 text-green-500'
                : index === selectedAnswer
                ? 'p-3 rounded-lg border bg-red-100 text-red-500'
                : 'p-3 rounded-lg border';
          }
          return (
            <div
              key={index}
              className={optionClasses}
              onClick={() => {
                if (selectedAnswer == null) {
                  answerQuestion(index, questions[currentQuestion].correct);
                }
              }}
            >
              {option}
            </div>
          );
        })}
      </div>

      {/* Reveal the fact only after an answer is selected */}
      {selectedAnswer != null && (
        <div className="mt-4 p-3 border rounded-lg">
          {questions[currentQuestion]?.fact}
        </div>
      )}
      <p>Your Score:{score}</p>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        {currentQuestion > 0 && (
          <button
            onClick={previousQuestion}
            className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-400"
          >
            Previous
          </button>
        )}
       { currentQuestion === questions.length - 1 ? <button
        className="mt-4 px-4 py-2 rounded-lg hover:bg-muted"
        
        onClick={() => increment(phase)}
      >
        Submit Quiz
      </button>
      :<button
          onClick={() => nextQuestion(onComplete)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ChevronRight className="ml-1 w-4 h-4" />
        </button>
       }
      </div>
    </div>
  );
};

export default FinalQuizQuestions;
