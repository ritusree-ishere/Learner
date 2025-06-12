
import LandingPage from '@/components/landing/LandingPage';
import { Button } from '@/components/ui/button'
import { authClient, useSession } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react'

const HomePage = () => {

  
  return (
    <div>
      <LandingPage />
    </div>
  )
}

export default HomePage