'use client'

import { useSession, signIn, signOut, signUp } from '@/lib/auth-client'

export function useAuth() {
  const { data: session, isPending, error } = useSession()

  return {
    user: session?.user ?? null,
    session: session ?? null,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    error,
    signIn,
    signOut,
    signUp,
  }
}
