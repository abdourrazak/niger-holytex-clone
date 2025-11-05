'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="/Holytex-Haut-.png"
          alt="Niger Holytex - Collection"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Contenu */}
      <div className="relative h-full container-custom flex items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-semibold">Nouvelle Collection 2025</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
              L'élégance et la chasteté de la Femme
            </h1>

            {/* Sous-titre */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Découvrez notre collection exclusive d'abayas, jilbabs et tuniques.
              Des vêtements modestes et élégants pour toutes les occasions.
            </p>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/products">
                  Découvrir la collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/categories">
                  Parcourir les catégories
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Décorations */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
    </section>
  )
}
