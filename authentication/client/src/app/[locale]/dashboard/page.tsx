"use client"

import { useState, useEffect } from "react"
import { useRequireAuth } from "@/src/hooks/useRequireAuth"


export default function DashboardPage() {
  useRequireAuth()
  const [user, setUser] = useState<{ nombre: string; correo: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = require('next/navigation').useRouter()

  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await require('@/src/services/userService').getUser()
        setUser(result)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    require('@/src/services/authService').logout()
    router.push('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Información del usuario</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : user ? (
          <>
            <p className="text-lg mb-2">Nombre: {user.nombre}</p>
            <p className="text-lg mb-6">Correo: {user.correo}</p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <p>No se pudo cargar la información del usuario.</p>
        )}
      </div>
    </div>
  )
}