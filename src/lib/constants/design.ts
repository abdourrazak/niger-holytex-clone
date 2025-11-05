/**
 * Design System Constants for Niger Holytex
 * Palette de couleurs, spacing, breakpoints, etc.
 */

export const COLORS = {
  primary: '#FF8C42', // Orange Holytex
  secondary: '#0F2B5B', // Bleu marine
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const SPACING = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
} as const

export const FONT_SIZES = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
} as const

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

export const PRODUCT_GRID = {
  cols: {
    mobile: 2,
    tablet: 3,
    desktop: 4,
  },
  gap: {
    mobile: '1rem',
    desktop: '1.5rem',
  },
} as const

export const CURRENCY = {
  symbol: 'CFA',
  position: 'after' as 'before' | 'after',
  separator: ' ',
} as const

export const CATEGORIES = [
  { id: 'abayas', name: 'Abayas', slug: 'abayas' },
  { id: 'tuniques', name: 'Tuniques', slug: 'tuniques' },
  { id: 'jilbabs', name: 'Jilbabs', slug: 'jilbabs' },
  { id: 'accessoires', name: 'Accessoires', slug: 'accessoires' },
] as const

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

export const COLORS_PRODUCT = [
  { name: 'Noir', hex: '#000000' },
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Bleu', hex: '#3B82F6' },
  { name: 'Rouge', hex: '#EF4444' },
  { name: 'Vert', hex: '#10B981' },
  { name: 'Jaune', hex: '#F59E0B' },
  { name: 'Rose', hex: '#EC4899' },
  { name: 'Violet', hex: '#8B5CF6' },
  { name: 'Beige', hex: '#D4A574' },
  { name: 'Marron', hex: '#92400E' },
] as const
