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
    bgColor: 'bg-[#0A1F44]',
    textColor: 'text-white',
    badgeColor: 'text-white/60',
    descColor: 'text-white/70',
    btn1Color: 'bg-primary hover:bg-primary/90 text-white',
    btn2Color: 'border-white text-white hover:bg-white hover:text-secondary',
    arrowColor: 'text-white',
    arrowBg: 'bg-white/10 hover:bg-white/20',
  },
  {
    id: 2,
    image: '/holyyy.png',
    title: 'Des abayas de qualité supérieure !',
    badge: 'NOUVELLE COLLECTION',
    description: 'Découvrez notre collection d\'abayas de qualité supérieure, conçues pour allier confort, style et foi.',
    cta1: 'Boutique',
    cta2: 'Voir la collection',
    link1: '/products',
    link2: '/categories/abayas',
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
    badgeColor: 'text-gray-600',
    descColor: 'text-gray-700',
    btn1Color: 'bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white',
    btn2Color: 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
    arrowColor: 'text-gray-900',
    arrowBg: 'bg-gray-900/10 hover:bg-gray-900/20',
  },
  {
    id: 3,
    image: '/Acc-holytex.png',
    title: 'Accessoires Islamiques',
    badge: 'NOUVEL ARRIVAGE',
    description: 'Des accessoires islamiques pour enrichir votre quotidien ! Découvrez notre sélection d\'objets conçus pour accompagner votre spiritualité et faciliter votre pratique.',
    cta1: 'Acheter',
    cta2: 'Voir plus',
    link1: '/products',
    link2: '/categories/accessoires',
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
    badgeColor: 'text-gray-600',
    descColor: 'text-gray-700',
    btn1Color: 'bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white',
    btn2Color: 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
    arrowColor: 'text-gray-900',
    arrowBg: 'bg-gray-900/10 hover:bg-gray-900/20',
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
    <section className="relative w-full">
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className={`flex-[0_0_100%] min-w-0 ${slide.bgColor}`}>
              <div className="relative min-h-[550px] flex items-center">
                <div className="container-custom py-16 md:py-20 lg:py-24 w-full">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
                    {/* Contenu Texte - Gauche */}
                    <div className={`${slide.textColor} space-y-4`}>
                      {/* Badge */}
                      <p className={`text-[10px] md:text-xs font-semibold tracking-wider ${slide.badgeColor} uppercase`}>
                        {slide.badge}
                      </p>

                      {/* Title */}
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className={`text-sm md:text-base ${slide.descColor} max-w-lg`}>
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button 
                          asChild 
                          size="default"
                          className={`${slide.btn1Color} rounded-full px-6`}
                        >
                          <Link href={slide.link1}>
                            {slide.cta1}
                          </Link>
                        </Button>
                        <Button 
                          asChild 
                          size="default"
                          variant="outline"
                          className={`${slide.btn2Color} rounded-full px-6`}
                        >
                          <Link href={slide.link2}>
                            {slide.cta2}
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Image - Droite */}
                    <div className="relative flex justify-center lg:justify-end">
                      <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-contain"
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
        className={`absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full ${slides[selectedIndex]?.arrowBg || 'bg-white/10 hover:bg-white/20'} backdrop-blur-sm flex items-center justify-center transition-all`}
        aria-label="Slide précédent"
      >
        <ChevronLeft className={`h-6 w-6 ${slides[selectedIndex]?.arrowColor || 'text-white'}`} />
      </button>

      <button
        onClick={scrollNext}
        className={`absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full ${slides[selectedIndex]?.arrowBg || 'bg-white/10 hover:bg-white/20'} backdrop-blur-sm flex items-center justify-center transition-all`}
        aria-label="Slide suivant"
      >
        <ChevronRight className={`h-6 w-6 ${slides[selectedIndex]?.arrowColor || 'text-white'}`} />
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
