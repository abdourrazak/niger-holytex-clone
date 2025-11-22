'use client'

import { useCallback, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const recentlyViewed = [
  {
    id: 1,
    image: '/Niger5.jpg',
    category: 'Jilbab',
    name: 'Jilbab Nada - 2 pièce',
    price: '25000 CFA',
    rating: 5,
    reviews: 2,
  },
  {
    id: 11,
    image: '/abaya11.jpg',
    category: 'Abayas',
    name: 'Abaya Layla - Une pièce',
    price: '28000 CFA',
    rating: 4,
    reviews: 5,
  },
  {
    id: 12,
    image: '/abaya12.jpg',
    category: 'Abayas',
    name: 'Abaya Hawa - Une pièce',
    price: '24000 CFA',
  },
  {
    id: 13,
    image: '/abaya13.jpg',
    category: 'Abayas',
    name: 'Abaya Mariam - Une pièce',
    price: '26000 CFA',
    rating: 5,
    reviews: 1,
  },
  {
    id: 14,
    image: '/abaya14.jpg',
    category: 'Abayas',
    name: 'Abaya Khadija - Une pièce',
    price: '29000 CFA',
  },
  {
    id: 15,
    image: '/abaya15.jpg',
    category: 'Abayas',
    name: 'Abaya Aisha - Une pièce',
    price: '22000 CFA',
  },
]

export function RecentlyViewedSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    duration: 25,
    dragFree: false,
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
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Articles récemment consultés
            </h2>
            <p className="text-gray-500 text-sm">
              Reprenez là où vous vous êtes arrêté
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors underline decoration-2 underline-offset-4"
          >
            Voir tout l'historique
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative group/carousel">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all shadow-sm opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
            aria-label="Produits précédents"
            disabled={selectedIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all shadow-sm opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
            aria-label="Produits suivants"
            disabled={selectedIndex === scrollSnaps.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Products Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {recentlyViewed.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_20%] min-w-0"
                >
                  <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                    <Link href={`/products/${product.id}`} className="block">
                      {/* Image */}
                      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Heart Icon */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm hover:scale-110"
                        >
                          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 hover:fill-red-500 transition-colors" />
                        </button>

                        {/* Quick Add Button */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <Button
                            className="w-full bg-[#001529] hover:bg-[#001529]/90 text-white text-xs h-9 shadow-lg"
                            onClick={(e) => {
                              e.preventDefault()
                              // Add to cart logic
                            }}
                          >
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
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < (product.rating || 0)
                                  ? 'fill-orange-400 text-orange-400'
                                  : 'fill-gray-200 text-gray-200'
                                }`}
                            />
                          ))}
                          {product.reviews && (
                            <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                          )}
                        </div>

                        {/* Price */}
                        <p className="text-base font-bold text-gray-900">{product.price}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
