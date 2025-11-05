import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 p-2">
                <Image
                  src="/cropped-Logo-Holytex-Couche.png"
                  alt="Niger Holytex"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">Niger - Holytex</h3>
                <p className="text-xs text-white/70 leading-tight">L'élégance et la chasteté de la femme</p>
              </div>
            </div>
            
            <h4 className="font-semibold text-sm">La grâce au service de la pudeur !</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              Offrir des tenues qui incarnent la beauté et la modestie, afin que chaque femme puisse exprimer sa grâce naturelle
            </p>
            
            <Link 
              href="/about" 
              className="inline-flex items-center text-sm text-white hover:text-orange-500 transition-colors underline"
            >
              En savoir plus →
            </Link>
          </div>

          {/* Catégories de produits */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base mb-3">Catégories de produits</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/categories/abayas" className="text-sm text-white/90 hover:text-orange-500 transition-colors">
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
          <div className="space-y-3">
            <h3 className="font-semibold text-base mb-3">Support & Conditions</h3>
            <ul className="space-y-2.5">
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
          <div className="space-y-3">
            <h3 className="font-semibold text-base mb-3">Infos de contacts</h3>
            <div className="space-y-2.5 text-sm text-white/90 leading-relaxed">
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
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <p className="text-center text-sm text-white/70">
            2025 • Tous droits réservés à Niger – Holytex • Conçu avec ❤️ par ABIB DIGIT.
          </p>
        </div>
      </div>
    </footer>
  )
}
