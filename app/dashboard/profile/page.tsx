'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLearnings } from '@/actions/getLearnings'
import QuizDetailsDisplay from '@/components/core/RenderQuizes';

interface LearningRecord {
  id: string;
  userId: string;
  initialQuiz: string | null;
  initialQuizScore: number | null;
  recommendedVideos: any; // Assumed to be an array or JSON
  finalExam: string | null;
  finalExamScore: number | null;
  result: boolean | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface LearningsResponse {
  success: boolean;
  data: LearningRecord[];
  total: number;
  page: number;
  limit: number;
}

const LearningHistoryWithPagination: React.FC = () => {
  const [page, setPage] = useState(1)
  const limit = 10
  // State to toggle details for each record by id.
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({})

  const { data, error, isLoading, isFetching } = useQuery<any>({
    queryKey: ['getLearnings', page],
    queryFn: async () => await getLearnings(page, limit),
    
  })

  if (isLoading || isFetching) {
    return <div className="py-10 text-center">Loading...</div>
  }

  if (error || !data?.success) {
    return (
      <div className="py-10 text-center">
        Error: {error ? error.message : 'Failed to load data'}
      </div>
    )
  }

  const totalPages = Math.ceil(data.total / limit)

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Learning History</h2>
      {data.data.length === 0 ? (
        <p>No learning records found.</p>
      ) : (
        <div className="space-y-4">
          {data.data.map((record:any) => {
            let initialQuizQuestions: any[] = []
            let finalExamQuestions: any[] = []

            try {
              if (record.initialQuiz) {
                initialQuizQuestions = JSON.parse(record.initialQuiz)
              }
            } catch (e) {
              console.error("Error parsing initialQuiz:", e)
            }
            try {
              if (record.finalExam) {
                finalExamQuestions = JSON.parse(record.finalExam)
              }
            } catch (e) {
              console.error("Error parsing finalExam:", e)
            }

            return (
              <div key={record.id} className="border p-4 rounded">
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(record.createdAt).toLocaleString()}
                </p>
           
                <p>
                  <strong>Entrance Exam Score:</strong>{' '}
                  {record.initialQuizScore}/{initialQuizQuestions.length} 
                </p>
                <p>
                  <strong>Final Exam Score:</strong> {record.finalExamScore} / {finalExamQuestions.length}
                </p>
                <p>
                  <strong>Result:</strong>
                  {record.result ? <div className='text-green-500'>Passed</div> : <div className='text-red-500'>Failed</div> }
                </p>
                <button
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [record.id]: !prev[record.id],
                    }))
                  }
                  className="mt-2 px-4 py-2 rounded hover:bg-blue-600"
                >
                  {expanded[record.id] ? 'Hide Details' : 'Show Details'}
                </button>
                {expanded[record.id] && (
                  <div className="mt-4 space-y-4">
                    <QuizDetailsDisplay finalExamQuestions={finalExamQuestions} initialQuizQuestions={initialQuizQuestions} recommendedVideos={record.recommendedVideos} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default LearningHistoryWithPagination
