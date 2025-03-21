'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type FormData = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Login failed')
      }

      // Successful login - redirect to dashboard
      router.push('/account')
      router.refresh() // Refresh to update auth state
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">{error}</div>}

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border rounded-md"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border rounded-md"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        <div className="mt-1 text-right">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>

      <div className="text-center mt-4">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
