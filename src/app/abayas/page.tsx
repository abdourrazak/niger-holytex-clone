import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AbayasContent } from '@/components/abayas/AbayasContent'

export default function AbayasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AbayasContent />
      <Footer />
    </div>
  )
}
