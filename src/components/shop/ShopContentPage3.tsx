'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, SlidersHorizontal, Grid2X2, Grid3X3, LayoutGrid, Rows3, List, X } from 'lucide-react'
import { Star } from 'lucide-react'

const products = [
  {
    id: 25,
    name: 'Abaya Soraya - Une pièce',
    category: 'Abayas',
    price: 23000,
    image: '/slide9.jpg',
    rating: 5,
  },
  {
    id: 26,
    name: 'Abaya Taqwa - Une pièce',
    category: 'Abayas',
    price: 24000,
    image: '/slide10.jpg',
    rating: 5,
  },
  {
    id: 27,
    name: 'Abaya Umm Kulthum - Une pièce',
    category: 'Abayas',
    price: 25000,
    image: '/slide11.jpg',
    rating: 5,
  },
  {
    id: 28,
    name: 'Abaya Widad - Une pièce',
    category: 'Abayas',
    price: 26000,
    image: '/slide12.jpg',
    rating: 5,
  },
  {
    id: 29,
    name: 'Abaya Yasmin - Une pièce',
    category: 'Abayas',
    price: 27000,
    image: '/slide13.jpg',
    rating: 5,
  },
  {
    id: 30,
    name: 'Abaya Zeinab - Une pièce',
    category: 'Abayas',
    price: 28000,
    image: '/slide14.jpg',
    rating: 5,
  },
  {
    id: 31,
    name: 'Ensemble Amina - 2 pièces',
    category: 'Ensembles',
    price: 32000,
    image: '/Sandy.png',
    rating: 5,
  },
  {
    id: 32,
    name: 'Ensemble Khadija - 2 pièces',
    category: 'Ensembles',
    price: 35000,
    image: '/ZamZam.png',
    rating: 5,
  },
  {
    id: 33,
    name: 'Accessoire Holytex Premium',
    category: 'Accessoires',
    price: 15000,
    image: '/Acc-holytex.png',
    rating: 5,
  },
  {
    id: 34,
    name: 'Abaya Malak - Une pièce',
    category: 'Abayas',
    price: 19500,
    image: '/slide18.jpg',
    rating: 5,
    outOfStock: true,
  },
  {
    id: 35,
    name: 'Abaya Nadia - Une pièce',
    category: 'Abayas',
    price: 21500,
    image: '/slide19.jpg',
    rating: 5,
  },
]

const categories = [
  { name: 'Abayas', count: 25 },
  { name: 'Tunique', count: 3 },
  { name: 'Accessoires', count: 9 },
  { name: 'Jilbab', count: 10 },
  { name: 'Ensembles', count: 5 },
]

type ViewMode = '2' | '3' | '4' | '5' | 'list'

export function ShopContentPage3() {
  const [viewMode, setViewMode] = useState<ViewMode>('4')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceFilter, setPriceFilter] = useState<string | null>('1500')
  const [sortBy, setSortBy] = useState('default')

  const clearFilters = () => {
    setSelectedCategory(null)
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
          <span className="text-gray-900 font-medium">Page 3</span>
        </nav>
      </div>

      {/* Page Title */}
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center">Boutique</h1>
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
                          selectedCategory === cat.name ? 'text-gray-900 font-medium' : 'text-gray-600'
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
                <p className="text-sm text-gray-600">Prix : 1500 CFA — 35000 CFA</p>
                <div className="relative">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gray-800 rounded-full" style={{ width: '75%' }}></div>
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
                33–43 of 47 Results
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

            {/* Products Grid - 11 produits avec grille adaptée */}
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
                      {!product.outOfStock && (
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
                      )}

                      {/* Out of Stock Overlay */}
                      {product.outOfStock && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                          <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                            En Rupture De Stock
                          </span>
                        </div>
                      )}
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

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pb-16">
              <Link
                href="/products"
                className="h-10 w-10 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center font-medium hover:bg-gray-50 transition-colors"
              >
                1
              </Link>
              <Link
                href="/products/page/2"
                className="h-10 w-10 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center font-medium hover:bg-gray-50 transition-colors"
              >
                2
              </Link>
              <button className="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium hover:bg-gray-800 transition-colors">
                3
              </button>
              <span className="px-2 text-gray-400">...</span>
              <button className="h-10 w-10 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
