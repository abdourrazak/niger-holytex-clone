'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, SlidersHorizontal, Grid2X2, Grid3X3, LayoutGrid, Rows3, List, X, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { Star } from 'lucide-react'
import { ProductFilters } from './ProductFilters'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const products = [
  // Abayas
  {
    id: 1,
    name: 'Abaya alchir - 3 pièces',
    category: 'Abayas',
    price: 30000,
    image: '/slide13.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Abaya Al malikah',
    category: 'Abayas',
    price: 20000,
    image: '/slide14.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Abaya Anam - Une pièce',
    category: 'Abayas',
    price: 20000,
    image: '/slide16.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Abaya Atyaf - Une pièce',
    category: 'Abayas',
    price: 20000,
    image: '/slide7.jpg',
    rating: 5,
  },
  {
    id: 5,
    name: 'Abaya Ayaat - Une pièce',
    category: 'Abayas',
    price: 16000,
    image: '/slide11.jpg',
    rating: 5,
  },
  {
    id: 6,
    name: 'Abaya Basmalah - Une pièce',
    category: 'Abayas',
    price: 20000,
    image: '/slide12.jpg',
    rating: 5,
  },
  {
    id: 7,
    name: 'Abaya Dayyi - Une pièce',
    category: 'Abayas',
    price: 18000,
    image: '/slide8.jpg',
    rating: 5,
  },
  {
    id: 8,
    name: 'Abaya Djannat',
    category: 'Abayas',
    price: 20000,
    image: '/slide15.jpg',
    rating: 5,
  },
  {
    id: 9,
    name: 'Abaya Fairouz - Une pièce',
    category: 'Abayas',
    price: 20000,
    image: '/slide9.jpg',
    rating: 5,
  },
  {
    id: 10,
    name: 'Abaya Fatouma - Une pièce',
    category: 'Abayas',
    price: 20000,
    image: '/slide10.jpg',
    rating: 5,
  },
  {
    id: 11,
    name: 'Abaya Gonia - Une pièce',
    category: 'Abayas',
    price: 22000,
    image: '/slide11.jpg',
    rating: 5,
  },
  {
    id: 12,
    name: 'Abaya Goufrane - Une pièce',
    category: 'Abayas',
    price: 22000,
    image: '/slide12.jpg',
    rating: 5,
  },
  {
    id: 13,
    name: 'Abaya Hind - Une Pièce',
    category: 'Abayas',
    price: 22000,
    image: '/slide13.jpg',
    rating: 5,
    outOfStock: true,
  },
  {
    id: 14,
    name: 'Abaya Houdna - Une Pièce',
    category: 'Abayas',
    price: 16000,
    image: '/slide14.jpg',
    rating: 5,
  },
  {
    id: 15,
    name: 'Abaya Lina - 2 Pièces',
    category: 'Abayas',
    price: 27000,
    image: '/slide15.jpg',
    rating: 5,
  },
  {
    id: 16,
    name: 'Abaya Liyan - 2 pièces',
    category: 'Abayas',
    price: 30000,
    image: '/slide16.jpg',
    rating: 5,
  },
  // Tuniques
  {
    id: 17,
    name: 'Tunique Élégance - Rose Poudré',
    category: 'Tunique',
    price: 12000,
    image: '/slide13.jpg',
    rating: 4,
  },
  {
    id: 18,
    name: 'Tunique Moderne - Bleu Nuit',
    category: 'Tunique',
    price: 14500,
    image: '/slide14.jpg',
    rating: 5,
  },
  {
    id: 19,
    name: 'Ensemble Tunique & Pantalon',
    category: 'Tunique',
    price: 18000,
    image: '/slide16.jpg',
    rating: 5,
  },
  // Accessoires
  {
    id: 20,
    name: 'Hijab Soie de Médine - Beige',
    category: 'Accessoires',
    price: 5000,
    image: '/slide7.jpg',
    rating: 5,
  },
  {
    id: 21,
    name: 'Broche Magnétique Premium',
    category: 'Accessoires',
    price: 2000,
    image: '/slide11.jpg',
    rating: 4,
  },
  {
    id: 22,
    name: 'Sous-Hijab Ninja - Noir',
    category: 'Accessoires',
    price: 3500,
    image: '/slide12.jpg',
    rating: 5,
  },
  {
    id: 23,
    name: 'Sac à Main Élégant',
    category: 'Accessoires',
    price: 15000,
    image: '/slide8.jpg',
    rating: 4,
  },
  // Jilbab
  {
    id: 24,
    name: 'Jilbab 2 Pièces - Umm Hafsa',
    category: 'Jilbab',
    price: 25000,
    image: '/slide15.jpg',
    rating: 5,
  },
  {
    id: 25,
    name: 'Jilbab Saoudien - Noir Intense',
    category: 'Jilbab',
    price: 28000,
    image: '/slide9.jpg',
    rating: 5,
  },
  {
    id: 26,
    name: 'Jilbab de Portage',
    category: 'Jilbab',
    price: 30000,
    image: '/slide10.jpg',
    rating: 5,
  },
  {
    id: 27,
    name: 'Jilbab Enfant - Rose',
    category: 'Jilbab',
    price: 12000,
    image: '/slide11.jpg',
    rating: 5,
  },
]

const categories = [
  { name: 'Abayas', count: 16 },
  { name: 'Tunique', count: 3 },
  { name: 'Accessoires', count: 4 },
  { name: 'Jilbab', count: 4 },
]

type ViewMode = '2' | '3' | '4' | '5' | 'list'
const ITEMS_PER_PAGE = 12

export function ShopContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('4')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)

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
    setCurrentPage(1) // Reset page when filtering
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filter by category
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }
      // Filter by price
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

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

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
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
              Accueil
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Boutique</span>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="bg-white pb-8 pt-4 mb-6 shadow-sm">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Notre Boutique</h1>
          <p className="text-gray-500 max-w-2xl">
            Découvrez notre collection exclusive de vêtements modestes et élégants.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom pb-16">
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
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtrer les produits
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                  <SheetDescription>
                    Affinez votre recherche pour trouver le produit parfait.
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

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600 font-medium">
                Affichage de <span className="text-gray-900">
                  {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredProducts.length)}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                </span> sur <span className="text-gray-900">{filteredProducts.length}</span> résultats
              </p>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 hidden sm:inline">Trier par:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-9">
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
            {paginatedProducts.length > 0 ? (
              <div className={`grid ${getGridClass()} gap-6 mb-12`}>
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <Link href={`/products/${product.id}`} className="block">
                      {/* Product Image */}
                      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                        {/* Badge */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none">
                            Niger - Holytex
                          </Badge>
                          {product.outOfStock && (
                            <Badge variant="destructive">Rupture</Badge>
                          )}
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
                          className={`object-cover transition-transform duration-500 group-hover:scale-110 ${product.outOfStock ? 'opacity-60 grayscale' : ''}`}
                        />

                        {/* Quick Add Button - Slide Up */}
                        {!product.outOfStock && (
                          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg">
                              Ajouter au panier
                            </Button>
                          </div>
                        )}
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
                          <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
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
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Aucun produit trouvé</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  Essayez de modifier vos filtres ou de réinitialiser la recherche pour voir plus de produits.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSelectedCategories([])
                    setPriceRange([0, 50000])
                    setCurrentPage(1)
                  }}
                >
                  Réinitialiser tous les filtres
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "bg-gray-900 text-white hover:bg-gray-800" : ""}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
