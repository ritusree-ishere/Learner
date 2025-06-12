import React, { useState } from 'react';

interface YouTubeVideoCardPlayerProps {
  videoLinks: string[];
  onEnd?: () => void;
}

export const YouTubeVideoCardPlayer: React.FC<YouTubeVideoCardPlayerProps> = ({ videoLinks, onEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < videoLinks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      
      if (onEnd) {
        onEnd();
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-lg">
      <div className="relative pb-[56.25%] mb-4">
        <iframe
          src={videoLinks[currentIndex]}
          title={`YouTube Video ${currentIndex + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
      <div className="flex justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={goToNext}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {currentIndex === videoLinks.length - 1 ? 'End' : 'Next'}
        </button>
      </div>
    </div>
  );
};


