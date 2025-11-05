'use client'

import { useCallback, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const bestSellers = [
  {
    id: 1,
    image: '/Niger-1.png',
    category: 'Abayas',
    name: 'Abaya Qamar - Une pièce',
    price: '21000 CFA',
  },
  {
    id: 2,
    image: '/Niger-2.png',
    category: 'Abayas',
    name: 'Abaya alchir - 3 pièces',
    price: '30000 CFA',
    rating: 5,
    reviews: 1,
  },
  {
    id: 3,
    image: '/Niger-3.png',
    category: 'Abayas',
    name: 'Abaya sabaya - Une pièce',
    price: '21000 CFA',
  },
  {
    id: 4,
    image: '/Niger-4.png',
    category: 'Abayas',
    name: 'Abaya Basmallah - Une pièce',
    price: '20000 CFA',
  },
  {
    id: 5,
    image: '/Niger-5.png',
    category: 'Abayas',
    name: 'Abaya Fatouma - Une pièce',
    price: '20000 CFA',
  },
  {
    id: 6,
    image: '/Niger-6.png',
    category: 'Abayas',
    name: 'Abaya Amira - Une pièce',
    price: '22000 CFA',
  },
  {
    id: 7,
    image: '/Niger-7.png',
    category: 'Abayas',
    name: 'Abaya Nour - Une pièce',
    price: '23000 CFA',
  },
  {
    id: 8,
    image: '/Niger-8.png',
    category: 'Abayas',
    name: 'Abaya Safiya - Une pièce',
    price: '24000 CFA',
  },
]

export function BestSellersSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 5 },
    },
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Articles les plus vendus ..
          </h2>
          <Link 
            href="/products" 
            className="text-sm text-gray-700 hover:text-primary transition-colors underline"
          >
            Aller à la boutique
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white flex items-center justify-center transition-all shadow-lg"
            aria-label="Produits précédents"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white flex items-center justify-center transition-all shadow-lg"
            aria-label="Produits suivants"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Products Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {bestSellers.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_19%] min-w-0"
                >
                  <div className="block group">
                    {/* Image */}
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Heart Icon - Top Right */}
                      <button className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md z-10">
                        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 hover:fill-red-500 transition-colors" />
                      </button>

                      {/* Choix des options Button - Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          className="w-full bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white font-semibold"
                          asChild
                        >
                          <Link href={`/products/${product.id}`}>
                            Choix des options
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Category */}
                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>

                    {/* Product Name */}
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < product.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                        {product.reviews && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.reviews})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <p className="text-base font-bold text-gray-900">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {scrollSnaps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'w-12 bg-[#0A1F44]'
                      : 'w-8 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
