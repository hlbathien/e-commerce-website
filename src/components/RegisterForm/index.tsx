'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type FormData = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone: string
  acceptedTerms: boolean
  subscribeToNewsletter: boolean
}

const RegisterForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const password = watch('password', '')

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/customers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          acceptedTerms: data.acceptedTerms,
          subscribeToNewsletter: data.subscribeToNewsletter,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed')
      }

      // Successful registration - redirect to login or dashboard
      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block mb-1 font-medium">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full p-2 border rounded-md"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-1 font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="w-full p-2 border rounded-md"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border rounded-md"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-medium">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          className="w-full p-2 border rounded-md"
          placeholder="+1 (123) 456-7890"
          {...register('phone')}
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border rounded-md"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-1 font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="w-full p-2 border rounded-md"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <input
            id="acceptedTerms"
            type="checkbox"
            className="mt-1 mr-2"
            {...register('acceptedTerms', {
              required: 'You must accept the terms and conditions',
            })}
          />
          <label htmlFor="acceptedTerms">
            I agree to the{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms and Conditions
            </Link>
          </label>
        </div>
        {errors.acceptedTerms && (
          <p className="text-red-600 text-sm">{errors.acceptedTerms.message}</p>
        )}

        <div className="flex items-start">
          <input
            id="subscribeToNewsletter"
            type="checkbox"
            className="mt-1 mr-2"
            {...register('subscribeToNewsletter')}
          />
          <label htmlFor="subscribeToNewsletter">
            Subscribe to our newsletter for updates and promotions
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>

      <div className="text-center mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </div>
    </form>
  )
}

export default RegisterForm
