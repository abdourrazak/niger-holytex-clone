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
    featuredProduct: {
      name: 'Sandy',
      subtitle: 'Chaussettes Sandy',
      image: '/Sandy.png',
      bgColor: 'bg-white',
    },
    products: [
      {
        id: 1,
        image: '/abaya19.jpg',
        name: 'Abaya Lina - 2 Pièces',
        price: '27000 CFA',
      },
      {
        id: 2,
        image: '/abaya12.jpg',
        name: 'Abaya Qamar - Une pièce',
        price: '21000 CFA',
      },
      {
        id: 3,
        image: '/abaya13.jpg',
        name: 'Abaya alchir - 3 pièces',
        price: '30000 CFA',
      },
      {
        id: 4,
        image: '/abaya14.jpg',
        name: 'Abaya sabaya - Une pièce',
        price: '21000 CFA',
      },
    ],
  },
  {
    id: 'ensembles',
    title: 'Ensembles Modestes',
    featuredProduct: {
      name: 'Sandy',
      subtitle: 'Chaussettes Sandy',
      image: '/Sandy.png',
      bgColor: 'bg-white',
    },
    products: [
      {
        id: 5,
        image: '/abaya15.jpg',
        name: 'Ensemble Amina - 2 Pièces',
        price: '28000 CFA',
      },
      {
        id: 6,
        image: '/abaya16.jpg',
        name: 'Ensemble Leila - 3 pièces',
        price: '32000 CFA',
      },
      {
        id: 7,
        image: '/abaya17.jpg',
        name: 'Ensemble Yasmine - 2 pièces',
        price: '29000 CFA',
      },
      {
        id: 8,
        image: '/abaya18.jpg',
        name: 'Ensemble Salma - Une pièce',
        price: '25000 CFA',
      },
    ],
  },
  {
    id: 'accessoires',
    title: 'Accessoires de couvrement',
    featuredProduct: {
      name: 'Zam Zam',
      subtitle: 'En gros & en détail',
      image: '/ZamZam.png',
      bgColor: 'bg-[#B8E5F0]',
    },
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

  const hasProducts = category.products && category.products.length > 0

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
        {hasProducts ? (
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
        ) : (
          <div className="flex-1 relative min-h-[300px]">
            {/* Empty state - No products */}
          </div>
        )}

        {/* Featured Product - Right Side */}
        {category.featuredProduct && (
          <div className={`hidden lg:block w-80 ${category.featuredProduct.bgColor} rounded-lg p-6 shadow-sm border border-gray-200`}>
            <p className="text-xs text-blue-600 uppercase tracking-wide mb-2 font-semibold">POPULAIRE</p>
            <h3 className="text-2xl font-bold text-blue-600 mb-2">{category.featuredProduct.name}</h3>
            <p className="text-sm text-gray-700 mb-6">{category.featuredProduct.subtitle}</p>

            <div className="flex gap-2 mb-6">
              <Button
                asChild
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                <Link href={`/products/${category.featuredProduct.name.toLowerCase()}`}>Acheter</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold"
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
