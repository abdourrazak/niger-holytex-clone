'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CategoryCardProps {
  name: string
  slug: string
  image: string
  productCount?: number
  index?: number
}

export function CategoryCard({ name, slug, image, productCount, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/categories/${slug}`}>
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 h-[300px]">
          {/* Image */}
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Contenu */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            {productCount !== undefined && (
              <p className="text-sm text-white/80 mb-4">
                {productCount} {productCount > 1 ? 'produits' : 'produit'}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
              <span>Découvrir</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Badge si nouveau */}
          {index === 0 && (
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
              Nouveau
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
