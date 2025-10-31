'use client'

import Link from 'next/link'
import { UserNav } from '@/components/layout/user-nav'
import { useAuth } from '@/hooks/use-auth'

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold">
            Niger Holytex
          </Link>
          <UserNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight">
            Bienvenue sur Niger Holytex
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            La grâce au service de la pudeur
          </p>

          {isLoading ? (
            <div className="rounded-lg bg-white p-8 shadow-md">
              <p className="text-gray-600">Chargement...</p>
            </div>
          ) : isAuthenticated ? (
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-6">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Connexion réussie !
                </h2>
                <p className="text-lg text-gray-600">
                  Bienvenue, <span className="font-semibold">{user?.name || user?.email}</span>
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Vous êtes maintenant connecté à votre compte Niger Holytex.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/boutique"
                    className="rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
                  >
                    Découvrir la boutique
                  </Link>
                  <Link
                    href="/account"
                    className="rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50"
                  >
                    Mon compte
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Commencez votre expérience
              </h2>
              <p className="mb-6 text-gray-600">
                Créez un compte ou connectez-vous pour accéder à toutes nos fonctionnalités
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/register"
                  className="rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
                >
                  Créer un compte
                </Link>
                <Link
                  href="/login"
                  className="rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 text-4xl">👗</div>
              <h3 className="mb-2 font-semibold">Collections Exclusives</h3>
              <p className="text-sm text-gray-600">
                Découvrez nos abayas et jilbabs de qualité
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 text-4xl">🚚</div>
              <h3 className="mb-2 font-semibold">Livraison Rapide</h3>
              <p className="text-sm text-gray-600">
                Recevez vos commandes dans les meilleurs délais
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 text-4xl">💳</div>
              <h3 className="mb-2 font-semibold">Paiement Sécurisé</h3>
              <p className="text-sm text-gray-600">
                Plusieurs options de paiement disponibles
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Niger Holytex - Tous droits réservés</p>
          <p className="mt-2 text-sm">La grâce au service de la pudeur</p>
        </div>
      </footer>
    </div>
  )
}
