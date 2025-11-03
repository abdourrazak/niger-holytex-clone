'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Token de vérification manquant')
      return
    }

    verifyEmail()
  }, [token])

  const verifyEmail = async () => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Votre email a été vérifié avec succès !')
        // Rediriger vers login après 3 secondes
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        setStatus('error')
        setMessage(result.error || 'Erreur lors de la vérification')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Erreur réseau')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Vérification d'email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {status === 'loading' && (
              <>
                <Loader2 className="mx-auto h-16 w-16 animate-spin text-indigo-600" />
                <p className="mt-4 text-gray-600">Vérification en cours...</p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Email vérifié !
                </h3>
                <p className="mt-2 text-gray-600">{message}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Redirection vers la page de connexion...
                </p>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="mx-auto h-16 w-16 text-red-600" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Erreur de vérification
                </h3>
                <p className="mt-2 text-gray-600">{message}</p>
                <div className="mt-6 space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/login">Aller à la connexion</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/register">Créer un nouveau compte</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
