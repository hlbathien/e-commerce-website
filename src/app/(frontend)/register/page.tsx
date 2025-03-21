import React from 'react'
import { Metadata } from 'next'
import RegisterForm from '@/components/RegisterForm'

export const metadata: Metadata = {
  title: 'Register | E-Commerce Store',
  description: 'Create a new customer account',
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create an Account</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
