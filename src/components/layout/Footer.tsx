import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <Image
              src="/cropped-Logo-Holytex-Couche.png"
              alt="Niger Holytex"
              width={150}
              height={50}
              className="mb-4 brightness-0 invert"
            />
            <p className="text-sm text-white/80 mb-4">
              L'élégance et la chasteté de la Femme. Découvrez notre collection de vêtements modestes et élégants.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Informations</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition-colors">
                  Retours
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Niamey, Niger</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+227 XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>contact@nigerholytex.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <p className="text-center text-sm text-white/60">
            © {new Date().getFullYear()} Niger Holytex. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
