import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JilbabContent } from '@/components/jilbab/JilbabContent'

export default function JilbabPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <JilbabContent />
      <Footer />
    </div>
  )
}
