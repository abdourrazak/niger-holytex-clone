import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TuniqueContent } from '@/components/tunique/TuniqueContent'

export default function TuniquePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <TuniqueContent />
      <Footer />
    </div>
  )
}
