'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FaGoogle, FaGithub } from 'react-icons/fa'

export default function RegisterPage() {
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' })
  }

  const handleGitHubSignIn = async () => {
    await signIn('github', { callbackUrl: '/' })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Créer un compte</CardTitle>
          <CardDescription className="text-center">
            Rejoignez Niger Holytex et découvrez nos collections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaGoogle className="h-5 w-5 text-red-500" />
            S'inscrire avec Google
          </Button>

          <Button
            onClick={handleGitHubSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaGithub className="h-5 w-5" />
            S'inscrire avec GitHub
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Déjà un compte ?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Se connecter
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
