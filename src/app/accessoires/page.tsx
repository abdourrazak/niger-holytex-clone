import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AccessoiresContent } from '@/components/accessoires/AccessoiresContent'

export default function AccessoiresPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AccessoiresContent />
      <Footer />
    </div>
  )
}
