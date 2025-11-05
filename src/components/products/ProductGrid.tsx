'use client'

import { ProductCard } from './ProductCard'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number | null
  images: string[]
  categoryId: string
  inStock: boolean
  featured: boolean
  category: {
    name: string
  }
}

interface ProductGridProps {
  products: Product[]
  title?: string
  subtitle?: string
}

export function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun produit disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Grille de produits */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            comparePrice={product.comparePrice ?? undefined}
            image={product.images[0] || '/placeholder.jpg'}
            category={product.category.name}
            inStock={product.inStock}
            featured={product.featured}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
