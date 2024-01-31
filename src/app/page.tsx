'use client';

import * as action from '@/actions';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';


export default function Home() {
  const { data: session, status } = useSession()
  if (status === 'authenticated') {
    redirect('/home');
  }
  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
      <form action={action.signInGithub}>
        <Button className='flex items-center gap-2'>
          <GitHubLogoIcon />
          Sign In Github
        </Button>
      </form>
      <form action={action.signInGoogle}>
        <Button variant='outline'>
          Sign In Google
        </Button>
      </form>
      
      <h1>WELCOME TO NOTE</h1>
    </div>
  )
}
