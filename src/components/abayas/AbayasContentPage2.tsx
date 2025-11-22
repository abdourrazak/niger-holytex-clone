'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Grid2X2, Grid3X3, LayoutGrid, Rows3, List, Star, SlidersHorizontal, ChevronRight, ChevronLeft } from 'lucide-react'
import { ProductFilters } from '@/components/shop/ProductFilters'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const products = [
  {
    id: 117,
    name: 'Abaya Qamar - Une pièce',
    category: 'Abayas',
    price: 23000,
    image: '/abaya17.jpg',
    rating: 5,
  },
  {
    id: 118,
    name: 'Abaya Rahma - Une pièce',
    category: 'Abayas',
    price: 26000,
    image: '/abaya18.jpg',
    rating: 5,
  },
  {
    id: 119,
    name: 'Abaya Safiya - Une pièce',
    category: 'Abayas',
    price: 21000,
    image: '/abaya19.jpg',
    rating: 5,
  },
  {
    id: 120,
    name: 'Abaya Taqwa - Une pièce',
    category: 'Abayas',
    price: 29000,
    image: '/abaya20.jpg',
    rating: 5,
  },
  {
    id: 121,
    name: 'Abaya Umm Salama - Une pièce',
    category: 'Abayas',
    price: 27000,
    image: '/abaya21.jpg',
    rating: 5,
  },
  {
    id: 122,
    name: 'Abaya Widad - Une pièce',
    category: 'Abayas',
    price: 25000,
    image: '/abaya22.jpg',
    rating: 5,
  },
  {
    id: 123,
    name: 'Abaya Yasmin - Une pièce',
    category: 'Abayas',
    price: 24000,
    image: '/abaya23.jpg',
    rating: 5,
  },
  {
    id: 124,
    name: 'Abaya Zeinab - Une pièce',
    category: 'Abayas',
    price: 28000,
    image: '/abaya24.jpg',
    rating: 5,
  },
  {
    id: 125,
    name: 'Abaya Zahra - Une pièce',
    category: 'Abayas',
    price: 30000,
    image: '/abaya25.jpg',
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

export function AbayasContentPage2() {
  const [viewMode, setViewMode] = useState<ViewMode>('4')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Abayas'])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [sortBy, setSortBy] = useState('default')

  const handleCategoryChange = (category: string) => {
    if (category === 'reset') {
      setSelectedCategories([])
      return
    }
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [selectedCategories, priceRange, sortBy])

  const getGridClass = () => {
    switch (viewMode) {
      case '2': return 'grid-cols-1 sm:grid-cols-2'
      case '3': return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case '4': return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      case '5': return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
      case 'list': return 'grid-cols-1'
      default: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    }
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#001529] text-white py-16 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Collection Abayas</h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-8">
              Découvrez notre sélection exclusive d'abayas alliant élégance, modestie et qualité supérieure.
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
              <Link href="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/products" className="hover:text-white transition-colors">
                Boutique
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/abayas" className="hover:text-white transition-colors">
                Abayas
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">Page 2</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <ProductFilters
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </div>
          </aside>

          {/* Mobile Filter Sheet */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-white">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtrer les produits
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                  <SheetDescription>
                    Affinez votre recherche pour trouver l'abaya parfaite.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <ProductFilters
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600 font-medium">
                Affichage de <span className="text-gray-900">{filteredProducts.length}</span> résultats
              </p>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 hidden sm:inline">Trier par:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-9 border-gray-200">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Par défaut</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="name">Nom (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Buttons */}
                <div className="hidden sm:flex items-center gap-1 border-l border-gray-200 pl-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode('2')}
                    className={`h-8 w-8 ${viewMode === '2' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode('3')}
                    className={`h-8 w-8 ${viewMode === '3' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode('4')}
                    className={`h-8 w-8 ${viewMode === '4' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid ${getGridClass()} gap-6 mb-12`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <Link href={`/products/${product.id}`} className="block">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                      {/* Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-block px-3 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          Niger - Holytex
                        </span>
                      </div>

                      {/* Wishlist Icon */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <Star className="h-4 w-4 text-gray-600 hover:text-orange-500 hover:fill-orange-500 transition-colors" />
                      </button>

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Quick Add Button - Slide Up */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Button className="w-full bg-[#001529] hover:bg-[#001529]/90 text-white shadow-lg">
                          Ajouter au panier
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">{product.category}</p>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[40px] group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < product.rating
                                ? 'fill-orange-400 text-orange-400'
                                : 'fill-gray-200 text-gray-200'
                              }`}
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">(1)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-gray-900">
                          {product.price.toLocaleString()} CFA
                        </p>
                        <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-orange-500 -rotate-90" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pb-16">
              <Button variant="outline" size="icon" asChild>
                <Link href="/abayas">
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="/abayas">
                  1
                </Link>
              </Button>
              <Button variant="default" size="icon" className="bg-[#001529] hover:bg-[#001529]/90">
                2
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
