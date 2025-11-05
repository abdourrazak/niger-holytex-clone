import { HeroCarousel } from '@/components/home/HeroCarousel'
import { BestSellersSection } from '@/components/home/BestSellersSection'
import { CategoriesShowcase } from '@/components/home/CategoriesShowcase'
import { DeliveryBanner } from '@/components/home/DeliveryBanner'
import { AdditionalCategories } from '@/components/home/AdditionalCategories'
import { RecentlyViewedSection } from '@/components/home/RecentlyViewedSection'
import { ProductGrid } from '@/components/products/ProductGrid'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Home() {
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

      {/* Best Sellers Section */}
      <BestSellersSection />

      {/* Categories Showcase Section */}
      <CategoriesShowcase />

      {/* Delivery Banner */}
      <DeliveryBanner />

      {/* Additional Categories Section */}
      <AdditionalCategories />

      {/* Recently Viewed Section */}
      <RecentlyViewedSection />

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
