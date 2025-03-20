import type { CollectionBeforeLoginHook } from 'payload'

/**
 * Hook to update the lastLogin timestamp for a customer when they log in
 *
 * This hook is executed before a successful login and records the current
 * datetime in the customer's lastLogin field
 */
export const updateLastLogin: CollectionBeforeLoginHook = async ({ req, user }) => {
  try {
    // Get payload instance from request
    const { payload } = req

    // Update the lastLogin field with current date
    await payload.update({
      collection: 'customers',
      id: user.id,
      data: {
        lastLogin: new Date().toISOString(),
      },
    })

    return user
  } catch (error) {
    // Log error but don't prevent login
    console.error('Failed to update lastLogin timestamp:', error)
    return user
  }
}
