'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, SlidersHorizontal, Grid2X2, Grid3X3, LayoutGrid, Rows3, List, X } from 'lucide-react'
import { Star } from 'lucide-react'

const products = [
  {
    id: 401,
    name: 'Jilbab Amina - 2 Pièces',
    category: 'Jilbab',
    price: 18000,
    image: '/abaya1.jpg',
    rating: 5,
  },
  {
    id: 402,
    name: 'Jilbab Fatima - Une pièce',
    category: 'Jilbab',
    price: 16000,
    image: '/abaya2.jpg',
    rating: 5,
  },
  {
    id: 403,
    name: 'Jilbab Khadija - 2 Pièces',
    category: 'Jilbab',
    price: 20000,
    image: '/abaya3.jpg',
    rating: 5,
  },
  {
    id: 404,
    name: 'Jilbab Aicha - Une pièce',
    category: 'Jilbab',
    price: 17000,
    image: '/abaya4.jpg',
    rating: 5,
  },
  {
    id: 405,
    name: 'Jilbab Maryam - 2 Pièces',
    category: 'Jilbab',
    price: 19000,
    image: '/abaya5.jpg',
    rating: 5,
  },
  {
    id: 406,
    name: 'Jilbab Zahra - Une pièce',
    category: 'Jilbab',
    price: 15000,
    image: '/abaya6.jpg',
    rating: 5,
  },
  {
    id: 407,
    name: 'Jilbab Safiya - 2 Pièces',
    category: 'Jilbab',
    price: 21000,
    image: '/abaya7.jpg',
    rating: 5,
  },
  {
    id: 408,
    name: 'Jilbab Hafsa - Une pièce',
    category: 'Jilbab',
    price: 16500,
    image: '/abaya8.jpg',
    rating: 5,
  },
  {
    id: 409,
    name: 'Jilbab Umm Salama - 2 Pièces',
    category: 'Jilbab',
    price: 22000,
    image: '/abaya9.jpg',
    rating: 5,
  },
  {
    id: 410,
    name: 'Jilbab Ruqayya - Une pièce',
    category: 'Jilbab',
    price: 18500,
    image: '/abaya10.jpg',
    rating: 5,
  },
]

const categories = [
  { name: 'Abayas', count: 25 },
  { name: 'Tunique', count: 3 },
  { name: 'Accessoires', count: 9 },
  { name: 'Jilbab', count: 10, active: true },
]

type ViewMode = '2' | '3' | '4' | '5' | 'list'

export function JilbabContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('4')
  const [selectedCategory, setSelectedCategory] = useState<string>('Jilbab')
  const [priceFilter, setPriceFilter] = useState<string | null>('2000')
  const [sortBy, setSortBy] = useState('default')

  const clearFilters = () => {
    setSelectedCategory('')
    setPriceFilter(null)
  }

  const getGridClass = () => {
    switch (viewMode) {
      case '2':
        return 'grid-cols-1 md:grid-cols-2'
      case '3':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case '4':
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      case '5':
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
      case 'list':
        return 'grid-cols-1'
      default:
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    }
  }

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="container-custom pt-6 pb-4">
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Accueil
          </Link>
          <span className="text-gray-400">&gt;</span>
          <Link href="/products" className="text-gray-600 hover:text-gray-900">
            Boutique
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900 font-medium">Jilbab</span>
        </nav>
      </div>

      {/* Page Title */}
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center">Jilbab</h1>
      </div>

      {/* Main Content */}
      <div className="container-custom pb-16">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            {/* Filter Button */}
            <button className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900">
              <SlidersHorizontal className="h-5 w-5" />
              <span className="font-medium">Filtrer les produits</span>
            </button>

            {/* Active Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Refine by</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 mb-4"
              >
                Clear All
              </button>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 bg-gray-900 text-white text-sm rounded-full">
                  Jilbab
                  <X className="h-3 w-3 ml-2" />
                </span>
              </div>
            </div>

            {/* Filter by Category */}
            <div className="mb-8">
              <button className="flex items-center justify-between w-full mb-4">
                <h3 className="font-semibold text-gray-900">Filtrer par catégorie</h3>
                <ChevronDown className="h-4 w-4" />
              </button>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    {cat.name === 'Abayas' ? (
                      <Link
                        href="/abayas"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {cat.name} ({cat.count})
                      </Link>
                    ) : cat.name === 'Tunique' ? (
                      <Link
                        href="/tunique"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {cat.name} ({cat.count})
                      </Link>
                    ) : cat.name === 'Accessoires' ? (
                      <Link
                        href="/accessoires"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {cat.name} ({cat.count})
                      </Link>
                    ) : (
                      <button
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`text-sm hover:text-gray-900 ${
                          cat.active ? 'text-gray-900 font-medium' : 'text-gray-600'
                        }`}
                      >
                        {cat.name} ({cat.count})
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter by Price */}
            <div className="mb-8">
              <button className="flex items-center justify-between w-full mb-4">
                <h3 className="font-semibold text-gray-900">Prix</h3>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Prix : 2000 CFA — 40000 CFA</p>
                <div className="relative">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gray-800 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                    <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-200">
              <p className="text-sm text-gray-600">
                10 Results
              </p>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Trier par:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border-0 bg-transparent text-gray-900 focus:ring-0 cursor-pointer"
                  >
                    <option value="default">Par défaut</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="name">Nom</option>
                  </select>
                </div>

                {/* View Mode Buttons */}
                <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
                  <button
                    onClick={() => setViewMode('2')}
                    className={`p-2 rounded ${viewMode === '2' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    title="2 colonnes"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('3')}
                    className={`p-2 rounded ${viewMode === '3' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    title="3 colonnes"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('4')}
                    className={`p-2 rounded ${viewMode === '4' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    title="4 colonnes"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('5')}
                    className={`p-2 rounded ${viewMode === '5' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    title="5 colonnes"
                  >
                    <Rows3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    title="Liste"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid - 10 produits */}
            <div className={`grid ${getGridClass()} gap-5 mb-12`}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <Link href={`/products/${product.id}`} className="block">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                      {/* Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-block px-2 py-0.5 bg-orange-500 text-white text-xs font-medium rounded">
                          Niger - Holytex
                        </span>
                      </div>
                      
                      {/* Wishlist Icon */}
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <svg className="h-4 w-4 text-gray-600 hover:text-red-500 hover:fill-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Choix des options Button */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            // Add to cart logic here
                          }}
                          className="w-full py-2 bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white font-medium text-xs rounded transition-colors"
                        >
                          Choix des options
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-3">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < product.rating
                                ? 'fill-orange-400 text-orange-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(1)</span>
                      </div>

                      {/* Price */}
                      <p className="text-base font-bold text-gray-900">
                        {product.price.toLocaleString()} CFA
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
