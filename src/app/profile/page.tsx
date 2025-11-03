'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Mail, Calendar, Shield } from 'lucide-react'

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}

function ProfileContent() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpdateProfile = async () => {
    setLoading(true)
    setMessage('')

    try {
      const token = localStorage.getItem('sessionToken')
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('Profil mis à jour avec succès !')
        setIsEditing(false)
        // Recharger la page pour mettre à jour les données
        window.location.reload()
      } else {
        setMessage(result.error || 'Erreur lors de la mise à jour')
      }
    } catch (error) {
      setMessage('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Mon Profil</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Informations principales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Gérez vos informations de profil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <User className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Nom</p>
                  {isEditing ? (
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium">{user?.name || 'Non défini'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Mail className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Shield className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Rôle</p>
                  <p className="font-medium">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        user?.role === 'ADMIN'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user?.role}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Calendar className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Membre depuis</p>
                  <p className="font-medium">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : '-'}
                  </p>
                </div>
              </div>

              {message && (
                <div
                  className={`rounded-md p-3 text-sm ${
                    message.includes('succès')
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleUpdateProfile} disabled={loading}>
                      {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setName(user?.name || '')
                      }}
                    >
                      Annuler
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Modifier le profil
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez vos paramètres de sécurité
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium">Mot de passe</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Dernière modification : Jamais
                </p>
                <Button variant="outline" className="mt-3" size="sm">
                  Changer le mot de passe
                </Button>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium">Vérification email</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {user?.email ? 'Email non vérifié' : '-'}
                </p>
                <Button variant="outline" className="mt-3" size="sm">
                  Envoyer un email de vérification
                </Button>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="font-medium text-red-900">Zone dangereuse</h3>
                <p className="mt-1 text-sm text-red-700">
                  Supprimer définitivement votre compte
                </p>
                <Button variant="outline" className="mt-3 border-red-300 text-red-700 hover:bg-red-100" size="sm">
                  Supprimer mon compte
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
