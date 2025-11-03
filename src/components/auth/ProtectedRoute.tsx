'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Rediriger vers login si non authentifié
        router.push('/login?redirect=' + encodeURIComponent(window.location.pathname))
      } else if (requireAdmin && user?.role !== 'ADMIN') {
        // Rediriger vers home si admin requis mais user n'est pas admin
        router.push('/')
      }
    }
  }, [isLoading, isAuthenticated, user, requireAdmin, router])

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification...</p>
        </div>
      </div>
    )
  }

  // Ne rien afficher si non authentifié (redirection en cours)
  if (!isAuthenticated) {
    return null
  }

  // Ne rien afficher si admin requis mais user n'est pas admin
  if (requireAdmin && user?.role !== 'ADMIN') {
    return null
  }

  // Afficher le contenu si tout est OK
  return <>{children}</>
}
