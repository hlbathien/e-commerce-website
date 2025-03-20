import { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrSelf } from '@/access/authenticatedOrSelf'

import { updateInventoryHook } from './hooks/updateInventoryHook'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customer', 'status', 'total', 'createdAt'],
  },
  access: {
    read: authenticatedOrSelf,
    create: authenticatedOrSelf,
    update: authenticated, // Only admins can update orders
    delete: authenticated, // Only admins can delete orders
  },
  hooks: {
    afterChange: [updateInventoryHook],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create') {
              // Generate a unique order number (date-based + random)
              return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            }
            return data?.orderNumber
          },
        ],
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Customer who placed this order',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Price at time of purchase (in cents)',
          },
        },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      min: 0,
      required: true,
      admin: {
        description: 'Subtotal before tax and shipping (in cents)',
      },
    },
    {
      name: 'tax',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Tax amount (in cents)',
      },
    },
    {
      name: 'shipping',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Shipping cost (in cents)',
      },
    },
    {
      name: 'total',
      type: 'number',
      min: 0,
      required: true,
      admin: {
        description: 'Total order amount (in cents)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
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
      name: 'billingAddress',
      type: 'group',
      fields: [
        {
          name: 'sameAsShipping',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            condition: (data) => data?.billingAddress?.sameAsShipping === false,
          },
        },
        {
          name: 'addressLine1',
          type: 'text',
          required: true,
          admin: {
            condition: (data) => data?.billingAddress?.sameAsShipping === false,
          },
        },
        {
          name: 'addressLine2',
          type: 'text',
          admin: {
            condition: (data) => data?.billingAddress?.sameAsShipping === false,
          },
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          admin: {
            condition: (data) => data?.billingAddress?.sameAsShipping === false,
          },
        },
        {
          name: 'state',
          type: 'text',
          required: true,
          admin: {
            condition: (data) => data?.billingAddress?.sameAsShipping === false,
          },
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
          admin: {
            condition: (data) => data?.billingAddress?.sameAsShipping === false,
          },
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          defaultValue: 'United States',
          admin: {
            condition: (data) => data?.billingAddress?.sameAsShipping === false,
          },
        },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      required: true,
      options: [
        { label: 'Credit Card', value: 'credit_card' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Order notes (internal use only)',
      },
    },
  ],
}
