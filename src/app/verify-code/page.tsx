'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle, Loader2, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

function VerifyCodeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [canResend, setCanResend] = useState(false)
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    if (!email) {
      toast.error('Email manquant')
      router.push('/register')
    }
  }, [email, router])

  // Countdown pour renvoyer le code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus sur le champ suivant
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newCode = pastedData.split('')
    setCode([...newCode, ...Array(6 - newCode.length).fill('')])
  }

  const handleVerify = async () => {
    const verificationCode = code.join('')
    
    if (verificationCode.length !== 6) {
      toast.error('Veuillez entrer le code complet')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode, email }),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess(true)
        toast.success('Email vérifié avec succès !')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        toast.error(result.error || 'Code invalide')
        setCode(['', '', '', '', '', ''])
        document.getElementById('code-0')?.focus()
      }
    } catch (error) {
      toast.error('Erreur réseau')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Nouveau code envoyé !')
        setCountdown(60)
        setCanResend(false)
        setCode(['', '', '', '', '', ''])
        
        // En dev, afficher le code
        if (result.verificationCode) {
          toast.success(`Code (dev): ${result.verificationCode}`, { duration: 10000 })
        }
      } else {
        toast.error(result.error || 'Erreur lors de l\'envoi')
      }
    } catch (error) {
      toast.error('Erreur réseau')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <CheckCircle className="mx-auto h-20 w-20 text-green-600" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Email vérifié !
              </h2>
              <p className="mt-2 text-gray-600">
                Votre compte est maintenant actif.
                Redirection vers la connexion...
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <Mail className="h-8 w-8 text-indigo-600" />
            </div>
            <CardTitle className="text-2xl">Vérifiez votre email</CardTitle>
            <CardDescription>
              Nous avons envoyé un code à 6 chiffres à<br />
              <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-center text-sm text-gray-600">
                Entrez le code de vérification
              </p>
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="h-14 w-12 text-center text-2xl font-bold"
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleVerify}
              className="w-full"
              disabled={isLoading || code.join('').length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Vérification...
                </>
              ) : (
                'Vérifier'
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Vous n'avez pas reçu le code ?
              </p>
              {canResend ? (
                <Button
                  variant="link"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-indigo-600"
                >
                  Renvoyer le code
                </Button>
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  Renvoyer dans {countdown}s
                </p>
              )}
            </div>

            <div className="text-center">
              <Link
                href="/register"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Retour à l'inscription
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <VerifyCodeContent />
    </Suspense>
  )
}
