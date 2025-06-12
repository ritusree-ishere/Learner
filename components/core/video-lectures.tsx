'use client'
import { useDiffentPhase, useFirstPhaseQuizStore, useUserDetails } from '@/zustand/firstphase'
import React from 'react'
import { YouTubeVideoCardPlayer } from './YouTubeVideoCardPlayer'
import {dummyVideoLinks} from '@/data/videos'
const VideoLectures = ({ subject }: { subject: string }) => {

  
const userClass = useUserDetails((state)=>state.class)
const mainSubject = useUserDetails((state)=>state.subject)
const sub = mainSubject|| 'Science'
const videos = dummyVideoLinks[userClass][sub][subject]
console.log("user classs",userClass, "videos", videos)

  const increment = useDiffentPhase((state) => state.increment)
  const phase = useDiffentPhase((state) => state.phase)

  const handleEnd = () => {
    increment(phase)
    console.log("All videos have been played!");
  };
    const score = useFirstPhaseQuizStore((state)=>state.score)

  return (
    <div>
      <h1 className='text-center text-2xl'>You Have Scored {score} / 3 in Entrence Exam</h1>

      <h2 className="text-2xl font-semibold mb-4">Video Lectures on {subject}</h2>

      <YouTubeVideoCardPlayer videoLinks={videos} onEnd={handleEnd} />


    </div>
  )
}

export default VideoLectures



