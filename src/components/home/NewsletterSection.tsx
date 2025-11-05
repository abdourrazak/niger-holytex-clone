'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implémenter l'inscription newsletter
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success('Merci pour votre inscription !')
    setEmail('')
    setIsLoading(false)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icône */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Titre */}
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Restez informée de nos nouveautés
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8">
            Inscrivez-vous à notre newsletter et recevez en exclusivité nos dernières collections,
            offres spéciales et conseils mode.
          </p>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="flex-1 h-12"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="h-12"
            >
              {isLoading ? (
                'Inscription...'
              ) : (
                <>
                  S'inscrire
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Note de confidentialité */}
          <p className="text-xs text-muted-foreground mt-4">
            Nous respectons votre vie privée. Désinscription possible à tout moment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
