'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './index.scss'

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
    <form onSubmit={handleSubmit(onSubmit)} className="login-form__container space-y-6">
      {error && <div className="alert alert-error">{error}</div>}

      <div className="login-form__field">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="login-form__field">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="form-input"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
        <div className="login-form__forgot-password">
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="login-form__submit-button form-button">
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>

      <div className="login-form__register-link">
        Don&apos;t have an account? <Link href="/register">Register</Link>
      </div>
    </form>
  )
}

export default LoginForm
