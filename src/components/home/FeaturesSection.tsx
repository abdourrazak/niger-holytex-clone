'use client'

import { motion } from 'framer-motion'
import { Truck, Shield, HeadphonesIcon, RefreshCw } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Livraison Rapide',
    description: 'Livraison gratuite à partir de 50 000 CFA',
  },
  {
    icon: Shield,
    title: 'Paiement Sécurisé',
    description: 'Vos transactions sont 100% sécurisées',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support Client',
    description: 'Service client disponible 7j/7',
  },
  {
    icon: RefreshCw,
    title: 'Retours Faciles',
    description: 'Retours gratuits sous 14 jours',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 bg-gray-50 border-y">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-secondary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
