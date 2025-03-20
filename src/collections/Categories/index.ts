import { CollectionConfig } from 'payload/'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parent', 'products'],
  },
  access: {
    read: anyone, // Everyone can read categories
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      filterOptions: ({ id }) => {
        // Prevent self-reference - a category cannot be its own parent
        if (id) {
          return {
            id: {
              not_equals: id,
            },
          }
        }
        return true // Return true to apply no filtering when no ID is present
      },
      admin: {
        position: 'sidebar',
        description: 'Parent category (optional, for hierarchical categories)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Featured image for this category',
      },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'Products in this category',
        readOnly: true,
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Display this category on the homepage',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
}
