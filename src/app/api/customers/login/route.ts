import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function POST(request: Request) {
  const payload = await getPayload({ config })
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    // Authenticate user
    const result = await payload.login({
      collection: 'customers',
      data: {
        email,
        password,
      },
    })

    // Update last login time
    await payload.update({
      collection: 'customers',
      id: result.user.id,
      data: {
        lastLogin: new Date().toISOString(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Login error:', error)

    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
  }
}
