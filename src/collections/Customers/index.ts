import { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrSelf } from '@/access/authenticatedOrSelf'
import { anyone } from '@/access/anyone'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'role'],
  },
  access: {
    read: authenticatedOrSelf,
    create: anyone, // Anyone can register
    update: authenticatedOrSelf,
    delete: authenticated, // Only admins can delete users
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Phone number with country code',
      },
    },
    {
      name: 'addresses',
      type: 'array',
      fields: [
        {
          name: 'addressName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name for this address (e.g., "Home", "Work")',
          },
        },
        {
          name: 'isDefault',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Set as default address',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'addressLine1',
          type: 'text',
          required: true,
        },
        {
          name: 'addressLine2',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          defaultValue: 'United States',
        },
      ],
    },
    {
      name: 'wishlist',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'Products added to wishlist',
      },
    },
    {
      name: 'acceptedTerms',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        description: 'User has accepted terms and conditions',
      },
    },
    {
      name: 'subscribeToNewsletter',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeLogin: [],
  },
}
