export const CLOUDINARY_FOLDERS = {
  DEFAULT: '',
  CONTEXT_ECOM: 'context_ecom',
  PRODUCTS: 'context_ecom/products',
  USERS: 'context_ecom/users',
  SAMPLES: 'samples',
} as const satisfies Record<string, string>;
