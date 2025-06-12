"use client"

import userDetails from "@/actions/userDetails"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "@/lib/auth-client"
import { useDiffentPhase, useUserDetails } from "@/zustand/firstphase"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, GraduationCap, MapPin, School } from "lucide-react"
import { redirect } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"

// Define types for cleaner code
interface UserDetails {
  school?: string
  grade?: string
  city?: string
  country?: string
}

const subjects: Record<string, string[]> = {
  Maths: ["Algebra", "Geometry", "Trigonometry"],
  Science: ["Biology", "Physics", "Chemistry"],
  Social: ["History", "Geography", "Economics"],
}

// Subject icons and colors mapping
const subjectIcons: Record<string, React.ReactNode> = {
  Maths: (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18"></path>
      <path d="M7 12h10"></path>
      <path d="M10 18h4"></path>
    </svg>
  ),
  Science: (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v8.5a2.5 2.5 0 0 1-5 0V2"></path>
      <path d="M7 2v8.5a2.5 2.5 0 0 0 5 0V2"></path>
      <path d="M8.5 2h7"></path>
      <path d="M14 2v8.5a2.5 2.5 0 0 0 5 0V2"></path>
      <path d="M17 2v8.5a2.5 2.5 0 0 1-5 0V2"></path>
      <path d="M8.5 15a5 5 0 1 1 7 0"></path>
      <path d="M8.5 15l-1 5h9l-1-5"></path>
    </svg>
  ),
  Social: (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
      <path d="M2 12h20"></path>
    </svg>
  ),
}

const DashboardPage: React.FC = () => {
  const reset = useDiffentPhase((state) => state.reset)
  const phase = useDiffentPhase((state) => state.phase)
  const userSubject = useUserDetails((state) => state.setSubject)
  useEffect(() => {
    reset()
  })
  const session = useSession()
  const UserClass = useUserDetails((state: any) => state.setClass)
  const { data: user, error, isFetching } = useQuery<any>({ queryKey: ["userDetails"], queryFn: userDetails })
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-lg font-medium text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border border-destructive/20 rounded-lg bg-destructive/10 text-center">
        <svg
          className="w-12 h-12 text-destructive mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p className="text-destructive font-medium mb-4">Error loading user details. Please try again later.</p>
        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
          Refresh Page
        </Button>
      </div>
    )
  }

  UserClass(user.grade)

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 mb-8 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {session?.data?.user?.name || "User"}! 🎉</h1>
        <p className="text-muted-foreground">Ready to continue your learning journey?</p>
      </div>

      {/* User Info Section */}
      <Card className="mb-8 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Student Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <School className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">School</p>
                  <p className="font-medium">{user?.school || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Grade</p>
                  <p className="font-medium">{user?.grade || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center md:justify-end">
                <MapPin className="w-5 h-5 mr-3 text-primary md:order-2 md:ml-3 md:mr-0" />
                <div className="md:text-right md:order-1">
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{user?.city || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center md:justify-end">
                <svg
                  className="w-5 h-5 mr-3 text-primary md:order-2 md:ml-3 md:mr-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                <div className="md:text-right md:order-1">
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{user?.country || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Selection Section */}
      <Card className="mb-8 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            What subject shall we learn today? 📖
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.keys(subjects).map((subject) => (
              <button
                key={subject}
                onClick={() => {
                  userSubject(subject)
                  setSelectedSubject(subject)
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedSubject === subject
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted hover:bg-primary/90 hover:text-primary-foreground"
                }`}
              >
                <span className={selectedSubject === subject ? "text-primary-foreground" : "text-primary"}>
                  {subjectIcons[subject]}
                </span>
                {subject}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subcategories Section */}
      {selectedSubject && (
        <Card className="shadow-sm animate-in fade-in-50 duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <span className="mr-2 text-primary">{subjectIcons[selectedSubject]}</span>
              Explore {selectedSubject} Topics 🚀
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects[selectedSubject].map((topic) => (
                <Button
                  onClick={() => {
                    redirect(`/dashboard/${topic}`)
                  }}
                  key={topic}
                  className="h-auto py-4 text-lg justify-start group hover:bg-primary/90 hover:text-primary-foreground"
                  variant="outline"
                >
                  <span>{topic}</span>
                  <svg
                    className="w-5 h-5 ml-auto transition-transform group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default DashboardPage

