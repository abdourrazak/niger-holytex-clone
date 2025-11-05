import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 p-2.5 shadow-md">
                <Image
                  src="/cropped-Logo-Holytex-Couche.png"
                  alt="Niger Holytex"
                  width={55}
                  height={55}
                  className="object-contain"
                />
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-lg leading-tight text-white">Niger - Holytex</h3>
                <p className="text-xs text-white/80 leading-tight mt-1">L'élégance et la chasteté de la femme</p>
              </div>
            </div>
            
            <h4 className="font-bold text-base text-white leading-snug">La grâce au service de la pudeur !</h4>
            <p className="text-sm text-white/90 leading-relaxed">
              Offrir des tenues qui incarnent la beauté et la modestie, afin que chaque femme puisse exprimer sa grâce naturelle
            </p>
            
            <Link 
              href="/about" 
              className="inline-flex items-center text-sm font-medium text-white hover:text-orange-500 transition-colors underline underline-offset-4"
            >
              En savoir plus →
            </Link>
          </div>

          {/* Catégories de produits */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-white mb-4">Catégories de produits</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/categories/abayas" className="text-sm text-white/90 hover:text-orange-500 transition-colors font-normal">
                  Abayas
                </Link>
              </li>
              <li>
                <Link href="/categories/ensembles" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Ensembles Modestes
                </Link>
              </li>
              <li>
                <Link href="/categories/accessoires-islamiques" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Accessoires Islamiques
                </Link>
              </li>
              <li>
                <Link href="/categories/accessoires-couvrement" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Accessoires Couvrement
                </Link>
              </li>
              <li>
                <Link href="/categories/chaussures" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Chaussures
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Toute la boutique
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Conditions */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-white mb-4">Support & Conditions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  A Propos
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Conditions d'Utilisation
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Foire Aux Questions ( FAQ )
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Support 7/7 Jours
                </Link>
              </li>
              <li>
                <Link href="/reclamation" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
                  Déposer une réclamation
                </Link>
              </li>
            </ul>
          </div>

          {/* Infos de contacts */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-white mb-4">Infos de contacts</h3>
            <div className="space-y-3 text-sm text-white/90 leading-relaxed">
              <p>
                Quartier Katrey Est, même alignement que l'institut Iphaco, Niamey, Niger
              </p>
              <p>
                Tél : +227 92 24 24 16
              </p>
              <p>
                contact@nigerholytex.com
              </p>
              <p>
                Ouverts du Lundi au Samedi
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-2 mt-4">
              <Link 
                href="https://facebook.com" 
                target="_blank"
                className="h-9 w-9 rounded bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank"
                className="h-9 w-9 rounded bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-8">
        <div className="container mx-auto px-6 py-5 max-w-7xl">
          <p className="text-center text-sm text-white/80 font-normal">
            2025 • Tous droits réservés à Niger – Holytex • Conçu avec ❤️ par ABIB DIGIT.
          </p>
        </div>
      </div>
    </footer>
  )
}
