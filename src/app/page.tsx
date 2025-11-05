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

      {/* Footer */}
      <Footer />
    </div>
  )
}
