/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    customers: CustomerAuthOperations;
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    customers: Customer;
    users: User;
    media: Media;
    products: Product;
    categories: Category;
    orders: Order;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    customers: CustomersSelect<false> | CustomersSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    products: ProductsSelect<false> | ProductsSelect<true>;
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    orders: OrdersSelect<false> | OrdersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user:
    | (Customer & {
        collection: 'customers';
      })
    | (User & {
        collection: 'users';
      });
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface CustomerAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "customers".
 */
export interface Customer {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  /**
   * Phone number with country code
   */
  phone?: string | null;
  addresses?:
    | {
        /**
         * Name for this address (e.g., "Home", "Work")
         */
        addressName: string;
        /**
         * Set as default address
         */
        isDefault?: boolean | null;
        name: string;
        addressLine1: string;
        addressLine2?: string | null;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        id?: string | null;
      }[]
    | null;
  /**
   * Products added to wishlist
   */
  wishlist?: (string | Product)[] | null;
  /**
   * User has accepted terms and conditions
   */
  acceptedTerms: boolean;
  subscribeToNewsletter?: boolean | null;
  lastLogin?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: string;
  name: string;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  /**
   * Price in cents (e.g., $10.99 = 1099)
   */
  price: number;
  /**
   * Original price for sale items
   */
  compareAtPrice?: number | null;
  images?:
    | {
        image: string | Media;
        altText?: string | null;
        isPrimary?: boolean | null;
        id?: string | null;
      }[]
    | null;
  /**
   * Number of items in stock
   */
  inventory: number;
  /**
   * Stock Keeping Unit - unique product identifier
   */
  sku: string;
  categories?: (string | Category)[] | null;
  status?: ('draft' | 'published' | 'archived') | null;
  /**
   * Featured products appear on the homepage
   */
  featured?: boolean | null;
  metadata?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    keywords?: string | null;
  };
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  /**
   * Alternative text for accessibility
   */
  altText?: string | null;
  caption?: string | null;
  dimensions?: {
    width?: number | null;
    height?: number | null;
  };
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  name: string;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  /**
   * Parent category (optional, for hierarchical categories)
   */
  parent?: (string | null) | Category;
  /**
   * Featured image for this category
   */
  image?: (string | null) | Media;
  /**
   * Products in this category
   */
  products?: (string | Product)[] | null;
  /**
   * Display this category on the homepage
   */
  featured?: boolean | null;
  metadata?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  };
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  orderNumber?: string | null;
  /**
   * Customer who placed this order
   */
  customer: string | User;
  items: {
    product: string | Product;
    quantity: number;
    /**
     * Price at time of purchase (in cents)
     */
    price: number;
    id?: string | null;
  }[];
  /**
   * Subtotal before tax and shipping (in cents)
   */
  subtotal: number;
  /**
   * Tax amount (in cents)
   */
  tax?: number | null;
  /**
   * Shipping cost (in cents)
   */
  shipping?: number | null;
  /**
   * Total order amount (in cents)
   */
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress?: {
    sameAsShipping?: boolean | null;
    name?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    country?: string | null;
  };
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  /**
   * Order notes (internal use only)
   */
  notes?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'customers';
        value: string | Customer;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'products';
        value: string | Product;
      } | null)
    | ({
        relationTo: 'categories';
        value: string | Category;
      } | null)
    | ({
        relationTo: 'orders';
        value: string | Order;
      } | null);
  globalSlug?: string | null;
  user:
    | {
        relationTo: 'customers';
        value: string | Customer;
      }
    | {
        relationTo: 'users';
        value: string | User;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user:
    | {
        relationTo: 'customers';
        value: string | Customer;
      }
    | {
        relationTo: 'users';
        value: string | User;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "customers_select".
 */
export interface CustomersSelect<T extends boolean = true> {
  firstName?: T;
  lastName?: T;
  phone?: T;
  addresses?:
    | T
    | {
        addressName?: T;
        isDefault?: T;
        name?: T;
        addressLine1?: T;
        addressLine2?: T;
        city?: T;
        state?: T;
        postalCode?: T;
        country?: T;
        id?: T;
      };
  wishlist?: T;
  acceptedTerms?: T;
  subscribeToNewsletter?: T;
  lastLogin?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  altText?: T;
  caption?: T;
  dimensions?:
    | T
    | {
        width?: T;
        height?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        card?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        tablet?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products_select".
 */
export interface ProductsSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  price?: T;
  compareAtPrice?: T;
  images?:
    | T
    | {
        image?: T;
        altText?: T;
        isPrimary?: T;
        id?: T;
      };
  inventory?: T;
  sku?: T;
  categories?: T;
  status?: T;
  featured?: T;
  metadata?:
    | T
    | {
        metaTitle?: T;
        metaDescription?: T;
        keywords?: T;
      };
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  parent?: T;
  image?: T;
  products?: T;
  featured?: T;
  metadata?:
    | T
    | {
        metaTitle?: T;
        metaDescription?: T;
      };
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders_select".
 */
export interface OrdersSelect<T extends boolean = true> {
  orderNumber?: T;
  customer?: T;
  items?:
    | T
    | {
        product?: T;
        quantity?: T;
        price?: T;
        id?: T;
      };
  subtotal?: T;
  tax?: T;
  shipping?: T;
  total?: T;
  status?: T;
  shippingAddress?:
    | T
    | {
        name?: T;
        addressLine1?: T;
        addressLine2?: T;
        city?: T;
        state?: T;
        postalCode?: T;
        country?: T;
      };
  billingAddress?:
    | T
    | {
        sameAsShipping?: T;
        name?: T;
        addressLine1?: T;
        addressLine2?: T;
        city?: T;
        state?: T;
        postalCode?: T;
        country?: T;
      };
  paymentMethod?: T;
  paymentStatus?: T;
  notes?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}