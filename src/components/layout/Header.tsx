'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, Heart, Menu, X, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserNav } from './user-nav'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Bar - Info */}
      <div className="bg-secondary text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+227XXXXXXXX" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+227 XX XX XX XX</span>
            </a>
            <a href="mailto:contact@nigerholytex.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">contact@nigerholytex.com</span>
            </a>
          </div>
          <div className="text-xs hidden md:block">
            Livraison gratuite à partir de 50 000 CFA
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/cropped-Logo-Holytex-Couche.png"
              alt="Niger Holytex"
              width={200}
              height={70}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                className="w-full pl-4 pr-12 h-11"
              />
              <Button
                size="icon"
                className="absolute right-0 top-0 h-11 w-11 rounded-l-none"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center font-semibold">
                0
              </span>
            </Button>

            {/* User Nav */}
            <div className="hidden md:block">
              <UserNav />
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar Mobile */}
        {searchOpen && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                className="w-full pl-4 pr-12"
              />
              <Button
                size="icon"
                className="absolute right-0 top-0 rounded-l-none"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <div className="border-t">
        <div className="container-custom">
          <nav className="hidden md:flex items-center justify-center gap-8 py-4">
            <Link
              href="/"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/categories/abayas"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Abayas
            </Link>
            <Link
              href="/categories/tuniques"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Tuniques
            </Link>
            <Link
              href="/categories/jilbabs"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Jilbabs
            </Link>
            <Link
              href="/categories/accessoires"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Accessoires
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Tous les produits
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              À propos
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container-custom py-4 space-y-3">
            <Link
              href="/"
              className="block py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/categories/abayas"
              className="block py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Abayas
            </Link>
            <Link
              href="/categories/tuniques"
              className="block py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tuniques
            </Link>
            <Link
              href="/categories/jilbabs"
              className="block py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jilbabs
            </Link>
            <Link
              href="/categories/accessoires"
              className="block py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accessoires
            </Link>
            <Link
              href="/products"
              className="block py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tous les produits
            </Link>
            <Link
              href="/about"
              className="block py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>
            <div className="pt-4 border-t">
              <UserNav />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
