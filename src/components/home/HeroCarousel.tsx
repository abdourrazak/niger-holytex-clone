'use client'

import { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: '/IMG_5821-600x600.jpg',
    title: 'Nouvelle Collection Abayas',
    subtitle: 'Élégance et Modestie',
    description: 'Découvrez notre collection exclusive d\'abayas pour toutes les occasions',
    cta: 'Découvrir',
    link: '/categories/abayas',
  },
  {
    id: 2,
    image: '/Holytex-Haut-.png',
    title: 'Variété de Couleurs',
    subtitle: 'Trouvez Votre Style',
    description: 'Des couleurs vibrantes pour exprimer votre personnalité',
    cta: 'Voir la collection',
    link: '/products',
  },
  {
    id: 3,
    image: '/IMG_5870-600x600.jpg',
    title: 'Jilbabs Premium',
    subtitle: 'Confort et Qualité',
    description: 'Des jilbabs confortables pour votre quotidien',
    cta: 'Explorer',
    link: '/categories/jilbabs',
  },
]

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0">
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
                {/* Image de fond */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                {/* Contenu */}
                <div className="relative h-full container-custom flex items-center">
                  <div className="max-w-2xl text-white">
                    {/* Subtitle */}
                    <p className="text-primary font-semibold text-lg md:text-xl mb-4 animate-fade-in">
                      {slide.subtitle}
                    </p>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl animate-fade-in">
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <Button asChild size="lg" className="text-base animate-fade-in">
                      <Link href={slide.link}>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        {slide.cta}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-6 w-6 text-secondary" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-6 w-6 text-secondary" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className="h-2 w-8 rounded-full bg-white/50 hover:bg-white transition-all"
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
