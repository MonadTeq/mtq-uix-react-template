export const brandColorTokens = {
  facebook: 'var(--color-brand-facebook)',
  twitter: 'var(--color-brand-twitter)',
  linkedin: 'var(--color-brand-linkedin)',
  youtube: 'var(--color-brand-youtube)',
  google: 'var(--color-brand-google)',
  apple: 'var(--color-brand-apple)',
} as const

export type BrandColorToken = keyof typeof brandColorTokens
