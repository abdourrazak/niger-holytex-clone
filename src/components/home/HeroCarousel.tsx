'use client'

import { useCallback, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: '/Holytex-Haut-.png',
    title: 'La grâce au service de la pudeur !',
    badge: 'VOUS ÊTES À NIGER HOLYTEX',
    description: 'Offrir des tenues qui incarnent la beauté et la modestie, afin que chaque femme puisse exprimer sa grâce naturelle',
    cta1: 'Boutique',
    cta2: 'Découvrir Holytex',
    link1: '/products',
    link2: '/about',
  },
  {
    id: 2,
    image: '/IMG_5821-600x600.jpg',
    title: 'Des abayas de qualité supérieure !',
    badge: 'NOUVELLE COLLECTION',
    description: 'Découvrez notre collection d\'abayas de qualité supérieure, conçues pour allier confort, style et foi.',
    cta1: 'Boutique',
    cta2: 'Voir la collection',
    link1: '/products',
    link2: '/categories/abayas',
  },
  {
    id: 3,
    image: '/IMG_5870-600x600.jpg',
    title: 'Élégance et modestie',
    badge: 'COLLECTION JILBABS',
    description: 'Des jilbabs élégants pour toutes les occasions',
    cta1: 'Boutique',
    cta2: 'Explorer',
    link1: '/products',
    link2: '/categories/jilbabs',
  },
]

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return

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
    <section className="relative w-full bg-[#0A1F44]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0">
              <div className="relative">
                <div className="container-custom py-16 md:py-20 lg:py-24">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Contenu Texte - Gauche */}
                    <div className="text-white space-y-6">
                      {/* Badge */}
                      <p className="text-xs md:text-sm font-semibold tracking-wider text-white/70 uppercase">
                        {slide.badge}
                      </p>

                      {/* Title */}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="text-base md:text-lg text-white/80 max-w-xl">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        <Button 
                          asChild 
                          size="lg" 
                          className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                        >
                          <Link href={slide.link1}>
                            {slide.cta1}
                          </Link>
                        </Button>
                        <Button 
                          asChild 
                          size="lg" 
                          variant="outline"
                          className="border-white text-white hover:bg-white hover:text-secondary rounded-full px-8"
                        >
                          <Link href={slide.link2}>
                            {slide.cta2}
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Image - Droite */}
                    <div className="relative">
                      <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          priority={slide.id === 1}
                        />
                      </div>
                    </div>
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
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === selectedIndex 
                ? 'bg-white w-8' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
