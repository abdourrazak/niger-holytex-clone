'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { LogOut, User as UserIcon } from 'lucide-react'

export function UserNav() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
  }

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Connexion
        </Link>
        <Link
          href="/register"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          S'inscrire
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/profile"
        className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors"
      >
        <UserIcon className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-900">
          {session.user?.name || session.user?.email}
        </span>
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        title="Se déconnecter"
      >
        <LogOut className="h-4 w-4" />
        <span>Déconnexion</span>
      </button>
    </div>
  )
}
