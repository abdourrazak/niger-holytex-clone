'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string | null
  role: string
  image: string | null
  createdAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Vérifier la session au chargement
  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const token = localStorage.getItem('sessionToken')
      
      if (!token) {
        setAuthState({ user: null, isLoading: false, isAuthenticated: false })
        return
      }

      const response = await fetch('/api/custom-session', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAuthState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
        })
      } else {
        // Session invalide, nettoyer
        localStorage.removeItem('sessionToken')
        setAuthState({ user: null, isLoading: false, isAuthenticated: false })
      }
    } catch (error) {
      console.error('Check session error:', error)
      setAuthState({ user: null, isLoading: false, isAuthenticated: false })
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/custom-signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        localStorage.setItem('sessionToken', result.session.sessionToken)
        setAuthState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true,
        })
        return { success: true, user: result.user }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch('/api/custom-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        localStorage.setItem('sessionToken', result.session.sessionToken)
        setAuthState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true,
        })
        return { success: true, user: result.user }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      const token = localStorage.getItem('sessionToken')
      
      if (token) {
        await fetch('/api/custom-signout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
      }

      localStorage.removeItem('sessionToken')
      setAuthState({ user: null, isLoading: false, isAuthenticated: false })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    isAuthenticated: authState.isAuthenticated,
    signIn,
    signUp,
    signOut,
    checkSession,
  }
}
