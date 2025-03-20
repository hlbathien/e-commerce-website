import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticatedOrSelf: isAuthenticated = ({ req: { user }, id }) => {
  // If user is not authenticated, deny access
  if (!user) {
    return false
  }

  // If accessing a specific resource
  if (id) {
    // Allow if it's the user's own resource
    return user.id === id
  }

  // For other cases, allow any authenticated user
  return true
}
