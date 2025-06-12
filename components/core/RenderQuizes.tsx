import React from 'react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  fact?: string;
}

interface QuizDetailsDisplayProps {
  initialQuizQuestions: Question[];
  finalExamQuestions: Question[];
  recommendedVideos: string[];
}

const QuizDetailsDisplay: React.FC<QuizDetailsDisplayProps> = ({
  initialQuizQuestions,
  finalExamQuestions,
  recommendedVideos,
}) => {
  const [showDetails, setShowDetails] = React.useState(false);
console.log(initialQuizQuestions,finalExamQuestions,recommendedVideos)
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
     

 
        <>
          <section>
            <h2 className="text-2xl font-bold mb-4">Initial Quiz Questions</h2>
            {initialQuizQuestions.map((q, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <p className="font-semibold">
                  Q{index + 1}: {q.question}
                </p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  {q.options.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ol>
                <p className="mt-2">
                  <strong>Correct Answer:</strong> {q.options[q.correct]}
                </p>
                <p className="mt-2">
                  <strong>Fact:</strong> {q.fact}
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Final Exam Questions</h2>
            {finalExamQuestions.map((q, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <p className="font-semibold">
                  Q{index + 1}: {q.question}
                </p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  {q.options.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ol>
                <p className="mt-2">
                  <strong>Correct Answer:</strong> {q.options[q.correct]}
                </p>
                <p className="mt-2">
                  <strong>Fact:</strong> {q.fact}
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Recommended Videos</h2>
            {recommendedVideos.map((videoUrl, index) => (
              <div key={index} className="mb-4">
                <iframe
                  src={videoUrl}
                  title={`Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video border rounded"
                ></iframe>
              </div>
            ))}
          </section>
        </>

    </div>
  );
};

export default QuizDetailsDisplay;
