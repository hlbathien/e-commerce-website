'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './index.scss'

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
    <form onSubmit={handleSubmit(onSubmit)} className="register-form__container space-y-6">
      {error && <div className="alert alert-error">{error}</div>}

      <div className="register-form__field-row">
        <div className="register-form__field">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="form-input"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        </div>

        <div className="register-form__field">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="form-input"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="register-form__field">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="register-form__field">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          className="form-input"
          placeholder="+1 (123) 456-7890"
          {...register('phone')}
        />
      </div>

      <div className="register-form__field">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="form-input"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
      </div>

      <div className="register-form__field">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="form-input"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="register-form__checkbox-container">
          <input
            id="acceptedTerms"
            type="checkbox"
            className="register-form__checkbox"
            {...register('acceptedTerms', {
              required: 'You must accept the terms and conditions',
            })}
          />
          <label htmlFor="acceptedTerms">
            I agree to the <Link href="/terms">Terms and Conditions</Link>
          </label>
        </div>
        {errors.acceptedTerms && <p className="error-message">{errors.acceptedTerms.message}</p>}

        <div className="register-form__checkbox-container">
          <input
            id="subscribeToNewsletter"
            type="checkbox"
            className="register-form__checkbox"
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
        className="register-form__submit-button form-button"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>

      <div className="register-form__login-link">
        Already have an account? <Link href="/login">Log in</Link>
      </div>
    </form>
  )
}

export default RegisterForm
