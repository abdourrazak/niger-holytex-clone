'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: 'abayas',
    title: 'Abayas',
    products: [
      {
        id: 1,
        image: '/Niger1.jpg',
        name: 'Abaya Lina - 2 Pièces',
        price: '27000 CFA',
      },
      {
        id: 2,
        image: '/Niger2.jpg',
        name: 'Abaya Qamar - Une pièce',
        price: '21000 CFA',
      },
      {
        id: 3,
        image: '/Niger3.jpg',
        name: 'Abaya alchir - 3 pièces',
        price: '30000 CFA',
      },
      {
        id: 4,
        image: '/Niger4.jpg',
        name: 'Abaya sabaya - Une pièce',
        price: '21000 CFA',
      },
    ],
  },
  {
    id: 'ensembles',
    title: 'Ensembles Modestes',
    products: [],
  },
  {
    id: 'accessoires',
    title: 'Accessoires de couvrement',
    products: [],
  },
]

export function CategoriesShowcase() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom space-y-16">
        {categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

function CategorySection({ category }: { category: typeof categories[0] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    duration: 25,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Si pas de produits, ne rien afficher
  if (!category.products || category.products.length === 0) {
    return null
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {category.title}
        </h2>
        <Link
          href={`/categories/${category.id}`}
          className="text-sm text-gray-700 hover:text-primary transition-colors underline"
        >
          Voir tous les produits
        </Link>
      </div>

      {/* Products Grid with Carousel */}
      <div className="flex gap-8">
        {/* Products Carousel - Left Side */}
        <div className="flex-1 relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white hover:bg-gray-100 border border-gray-300 flex items-center justify-center transition-all shadow-md"
            aria-label="Produits précédents"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white hover:bg-gray-100 border border-gray-300 flex items-center justify-center transition-all shadow-md"
            aria-label="Produits suivants"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_23%] min-w-0"
                >
                  <Link href={`/products/${product.id}`} className="block group">
                    {/* Image */}
                    <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden mb-3 border border-gray-200">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Name */}
                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <p className="text-base font-bold text-gray-900">{product.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Product - Right Side */}
        <div className="hidden lg:block w-80 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">POPULAIRE</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Sandy</h3>
          <p className="text-sm text-gray-600 mb-6">Chaussettes Sandy</p>

          <div className="flex gap-2 mb-6">
            <Button
              asChild
              className="flex-1 bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white"
            >
              <Link href="/products/sandy">Acheter</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              <Link href="/products/sandy">Voir le produit</Link>
            </Button>
          </div>

          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/Sandy.png"
              alt="Sandy Chaussettes"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
