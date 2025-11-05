import { HeroCarousel } from '@/components/home/HeroCarousel'
import { CategoryCard } from '@/components/products/CategoryCard'
import { ProductGrid } from '@/components/products/ProductGrid'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Home() {
  // Récupérer les catégories
  const categories = await prisma.category.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  })

  // Récupérer les produits mis en avant
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
    include: {
      category: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Nos Catégories
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez notre sélection de vêtements modestes et élégants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                  image={category.image || '/placeholder.jpg'}
                  index={index}
                />
              ))
            ) : (
              // Catégories par défaut si la base est vide
              <>
                <CategoryCard
                  name="Abayas"
                  slug="abayas"
                  image="/IMG_5821-600x600.jpg"
                  productCount={12}
                  index={0}
                />
                <CategoryCard
                  name="Tuniques"
                  slug="tuniques"
                  image="/IMG_5846-1-300x300.jpg"
                  productCount={8}
                  index={1}
                />
                <CategoryCard
                  name="Jilbabs"
                  slug="jilbabs"
                  image="/IMG_5870-600x600.jpg"
                  productCount={15}
                  index={2}
                />
                <CategoryCard
                  name="Accessoires"
                  slug="accessoires"
                  image="/Acc-holytex.png"
                  productCount={20}
                  index={3}
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {featuredProducts.length > 0 ? (
            <ProductGrid
              products={featuredProducts}
              title="Coups de Cœur"
              subtitle="Découvrez notre sélection de produits exceptionnels"
            />
          ) : (
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Coups de Cœur
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nos produits seront bientôt disponibles
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
