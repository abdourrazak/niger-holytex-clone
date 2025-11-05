'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: 'chaussures',
    title: '',
    showHeader: false,
    featuredProduct: {
      name: 'Veilleuse',
      subtitle: 'Coranique',
      image: '/Acc-holytex.png',
      bgColor: 'bg-gray-100',
    },
    products: [],
  },
]

export function AdditionalCategories() {
  return (
    <section className="py-8 bg-white">
      <div className="container-custom">
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

  const hasProducts = category.products && category.products.length > 0

  return (
    <div>
      {/* Header */}
      {category.showHeader !== false && (
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
      )}

      {/* Products Grid with Carousel */}
      <div className="flex gap-8">
        {/* Products Carousel - Left Side */}
        <div className="flex-1 relative min-h-[300px]">
          {/* Empty state - No navigation arrows */}
        </div>

        {/* Featured Product - Right Side */}
        {category.featuredProduct && (
          <div className={`hidden lg:block w-80 ${category.featuredProduct.bgColor} rounded-lg p-6 shadow-sm border border-gray-200`}>
            <p className="text-xs text-[#0A1F44] uppercase tracking-wide mb-2 font-semibold">POPULAIRE</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.featuredProduct.name}</h3>
            <p className="text-sm text-gray-700 mb-6">{category.featuredProduct.subtitle}</p>

            <div className="flex gap-2 mb-6">
              <Button
                asChild
                className="flex-1 bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white font-semibold"
              >
                <Link href={`/products/${category.featuredProduct.name.toLowerCase()}`}>Acheter</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold"
              >
                <Link href={`/products/${category.featuredProduct.name.toLowerCase()}`}>Voir le produit</Link>
              </Button>
            </div>

            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={category.featuredProduct.image}
                alt={category.featuredProduct.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
