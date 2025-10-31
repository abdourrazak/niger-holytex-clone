'use client'

import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export function UserNav() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth()

  if (isLoading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Connexion
        </Link>
        <Link
          href="/register"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          S'inscrire
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-700">
        {user?.name || user?.email}
      </span>
      <button
        onClick={() => signOut()}
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Déconnexion
      </button>
    </div>
  )
}
