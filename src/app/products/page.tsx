import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ShopContent } from '@/components/shop/ShopContent'

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ShopContent />
      <Footer />
    </div>
  )
}
