import Image from 'next/image'
import Link from 'next/link'

const recentlyViewed = [
  {
    id: 1,
    image: '/Niger5.jpg',
    name: 'Jilbab Nada - 2 pièce',
    price: '25000 CFA',
  },
]

export function RecentlyViewedSection() {
  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Articles récemment consultés
          </h2>
          <Link
            href="/products"
            className="text-sm text-gray-700 hover:text-primary transition-colors underline"
          >
            Aller à la boutique
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recentlyViewed.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block group"
            >
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
          ))}
        </div>
      </div>
    </section>
  )
}
