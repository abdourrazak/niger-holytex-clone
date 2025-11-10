'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, SlidersHorizontal, Grid2X2, Grid3X3, LayoutGrid, Rows3, List, X } from 'lucide-react'
import { Star } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Abaya alchir - 3 pièces',
    category: 'Abayas',
    price: 30000,
    image: '/Niger3.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Abaya Al malikah',
    category: 'Abayas',
    price: 20000,
    image: '/Niger4.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Abaya Anam - Une pièce',
    category: 'Abayas',
    price: 20000,
    image: '/Niger6.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Abaya Atyaf - Une pièce',
    category: 'Abayas',
    price: 20000,
    image: '/Niger7.jpg',
    rating: 5,
  },
]

const categories = [
  { name: 'Abayas', count: 25 },
  { name: 'Tunique', count: 3 },
  { name: 'Accessoires', count: 9 },
  { name: 'Jilbab', count: 10 },
]

type ViewMode = '2' | '3' | '4' | '5' | 'list'

export function ShopContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('4')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceFilter, setPriceFilter] = useState<string | null>('2650')
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
      <div className="border-b border-gray-200">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Accueil
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-900 font-medium">Boutique</span>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="container-custom py-8">
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

            {/* Refine By */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Refine by</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Clear All
                </button>
              </div>

              {/* Active Filters */}
              {priceFilter && (
                <div className="mb-4">
                  <button
                    onClick={() => setPriceFilter(null)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded"
                  >
                    <span>Price: 2650 CFA +</span>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
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
                    <button
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`text-sm hover:text-gray-900 ${
                        selectedCategory === cat.name ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
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
              {/* Price filter options would go here */}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600">
                1–16 of 46 Results
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

            {/* Products Grid */}
            <div className={`grid ${getGridClass()} gap-6`}>
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group block"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-block px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
                        Niger - Holytex
                      </span>
                    </div>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
