'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, Heart, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserNav } from './user-nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container-custom">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/cropped-Logo-Holytex-Couche.png"
              alt="Niger Holytex"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Produits
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Catégories
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              À propos
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                0
              </span>
            </Button>

            {/* User Nav */}
            <div className="hidden md:block">
              <UserNav />
            </div>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
