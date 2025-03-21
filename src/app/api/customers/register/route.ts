import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function POST(request: Request) {
  const payload = await getPayload({ config })
  try {
    const body = await request.json()

    const { email, password, firstName, lastName, phone, acceptedTerms, subscribeToNewsletter } =
      body

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !acceptedTerms) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    // Create new customer in Payload
    const result = await payload.create({
      collection: 'customers',
      data: {
        email,
        password,
        firstName,
        lastName,
        phone,
        acceptedTerms,
        subscribeToNewsletter: subscribeToNewsletter || false,
        lastLogin: new Date().toISOString(),
      },
    })

    // Remove sensitive data before sending the response
    const { password: _, ...customerData } = result

    return NextResponse.json(
      {
        message: 'Registration successful',
        customer: customerData,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Registration error:', error)

    // Handle duplicate email error
    if (error.message?.includes('duplicate key')) {
      return NextResponse.json(
        { message: 'An account with this email already exists' },
        { status: 409 },
      )
    }

    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 })
  }
}
