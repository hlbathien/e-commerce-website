import React from 'react'
import { Metadata } from 'next'
import LoginForm from '@/components/LoginForm'

export const metadata: Metadata = {
  title: 'Login | E-Commerce Store',
  description: 'Login to your customer account',
}

export default function LoginPage({ searchParams }: { searchParams: { registered?: string } }) {
  const showRegistrationMessage = searchParams.registered === 'true'

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto">
        {showRegistrationMessage && (
          <div className="bg-green-50 p-4 rounded-md text-green-700 mb-6">
            Account created successfully! Please log in with your credentials.
          </div>
        )}
        <h1 className="text-3xl font-bold mb-6">Log In</h1>
        <LoginForm />
      </div>
    </div>
  )
}
