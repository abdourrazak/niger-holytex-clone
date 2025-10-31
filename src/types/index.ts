// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  comparePrice?: number
  images: string[]
  categoryId: string
  category?: Category
  inStock: boolean
  featured: boolean
  variants?: ProductVariant[]
  reviews?: Review[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  productId: string
  size?: string
  color?: string
  stock: number
  sku?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  products?: Product[]
}

// ============================================
// CART & WISHLIST TYPES
// ============================================

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
}

// ============================================
// ORDER TYPES
// ============================================

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: OrderStatus
  total: number
  subtotal: number
  shippingCost: number
  paymentMethod: string
  paymentStatus: PaymentStatus
  shippingAddress: ShippingAddress
  items: OrderItem[]
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product?: Product
  quantity: number
  price: number
  size?: string
  color?: string
}

export interface ShippingAddress {
  fullName: string
  phone: string
  address: string
  city: string
  postalCode?: string
  country: string
}

// ============================================
// USER & AUTH TYPES
// ============================================

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  userId: string
  fullName: string
  phone: string
  address: string
  city: string
  postalCode?: string
  country: string
  isDefault: boolean
}

// ============================================
// REVIEW TYPES
// ============================================

export interface Review {
  id: string
  userId: string
  user?: User
  productId: string
  rating: number
  comment?: string
  createdAt: Date
  updatedAt: Date
}

// ============================================
// FILTER & SORT TYPES
// ============================================

export interface ProductFilters {
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  search?: string
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular'

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
