import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function DeliveryBanner() {
  return (
    <section className="relative py-20 bg-[#0A1F44] overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/95 to-[#0A1F44]/90" />
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Commandez et faites-vous
            <br />
            livrer partout au Niger
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Holytex-Niger est très rigoureux sur la livraison rapide à ses clients. Nous avons équipe efficace et soucieuse de la reception des colis des clients en un temps record.
          </p>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/products">
              Aller à la boutique
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
