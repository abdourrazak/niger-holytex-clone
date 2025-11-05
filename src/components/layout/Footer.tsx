import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <Image
                  src="/cropped-Logo-Holytex-Couche.png"
                  alt="Niger Holytex"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Niger - Holytex</h3>
                <p className="text-xs text-white/70">L'élégance et la chasteté de la femme</p>
              </div>
            </div>
            
            <h4 className="font-semibold text-base mb-3">La grâce au service de la pudeur !</h4>
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              Offrir des tenues qui incarnent la beauté et la modestie, afin que chaque femme puisse exprimer sa grâce naturelle
            </p>
            
            <Link 
              href="/about" 
              className="inline-flex items-center text-sm text-white hover:text-primary transition-colors underline"
            >
              En savoir plus →
            </Link>
          </div>

          {/* Catégories de produits */}
          <div>
            <h3 className="font-semibold text-base mb-4">Catégories de produits</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/abayas" className="text-sm text-white/80 hover:text-white transition-colors">
                  Abayas
                </Link>
              </li>
              <li>
                <Link href="/categories/ensembles" className="text-sm text-white/80 hover:text-white transition-colors">
                  Ensembles Modestes
                </Link>
              </li>
              <li>
                <Link href="/categories/accessoires-islamiques" className="text-sm text-white/80 hover:text-white transition-colors">
                  Accessoires Islamiques
                </Link>
              </li>
              <li>
                <Link href="/categories/accessoires-couvrement" className="text-sm text-white/80 hover:text-white transition-colors">
                  Accessoires Couvrement
                </Link>
              </li>
              <li>
                <Link href="/categories/chaussures" className="text-sm text-white/80 hover:text-white transition-colors">
                  Chaussures
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-white/80 hover:text-white transition-colors">
                  Toute la boutique
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Conditions */}
          <div>
            <h3 className="font-semibold text-base mb-4">Support & Conditions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">
                  A Propos
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="text-sm text-white/80 hover:text-white transition-colors">
                  Conditions d'Utilisation
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-sm text-white/80 hover:text-white transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-white/80 hover:text-white transition-colors">
                  Foire Aux Questions ( FAQ )
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-white/80 hover:text-white transition-colors">
                  Support 7/7 Jours
                </Link>
              </li>
              <li>
                <Link href="/reclamation" className="text-sm text-white/80 hover:text-white transition-colors">
                  Déposer une réclamation
                </Link>
              </li>
            </ul>
          </div>

          {/* Infos de contacts */}
          <div>
            <h3 className="font-semibold text-base mb-4">Infos de contacts</h3>
            <div className="space-y-3 text-sm text-white/80">
              <p className="leading-relaxed">
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
                className="h-9 w-9 rounded bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="https://tiktok.com" 
                target="_blank"
                className="h-9 w-9 rounded bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank"
                className="h-9 w-9 rounded bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-white/30 rounded text-sm">
                <span className="text-xl">🇫🇷</span>
                <span>FR</span>
              </button>
            </div>
            
            <p className="text-center text-sm text-white/60">
              2025 • Tous droits réservés à Niger – Holytex • Conçu avec ❤️ par ABIB DIGIT.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <Link
        href="https://wa.me/22792242416"
        target="_blank"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg transition-all z-50"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </Link>
    </footer>
  )
}
