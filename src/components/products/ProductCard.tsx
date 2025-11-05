'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, calculateDiscount } from '@/lib/utils/format'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  image: string
  category: string
  inStock?: boolean
  featured?: boolean
  index?: number
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  comparePrice,
  image,
  category,
  inStock = true,
  featured = false,
  index = 0,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const discount = comparePrice ? calculateDiscount(comparePrice, price) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="product-card relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        {/* Image Container */}
        <Link href={`/products/${slug}`}>
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <Image
              src={image}
              alt={name}
              fill
              className="product-image object-cover"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {featured && (
                <Badge className="bg-primary text-white">
                  Coup de cœur
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive">
                  -{discount}%
                </Badge>
              )}
              {!inStock && (
                <Badge variant="secondary">
                  Épuisé
                </Badge>
              )}
            </div>

            {/* Actions rapides */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 rounded-full bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault()
                  setIsWishlisted(!isWishlisted)
                }}
              >
                <Heart
                  className={cn(
                    'h-4 w-4',
                    isWishlisted && 'fill-red-500 text-red-500'
                  )}
                />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 rounded-full bg-white/90 hover:bg-white"
                asChild
              >
                <Link href={`/products/${slug}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Overlay "Ajouter au panier" */}
            {inStock && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    // TODO: Ajouter au panier
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter au panier
                </Button>
              </div>
            )}
          </div>
        </Link>

        {/* Informations produit */}
        <div className="p-4">
          <Link href={`/products/${slug}`}>
            {/* Catégorie */}
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {category}
            </p>

            {/* Nom */}
            <h3 className="font-semibold text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
              {name}
            </h3>

            {/* Prix */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-secondary">
                {formatPrice(price)}
              </span>
              {comparePrice && comparePrice > price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
