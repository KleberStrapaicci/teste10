/**
 * Página de Login Administrativo
 *
 * Esta página permite que administradores acessem o painel administrativo.
 * Funcionalidades:
 * - Formulário de login com campos para usuário e senha
 * - Validação de campos obrigatórios
 * - Simulação de autenticação (em um ambiente real, conectaria a um backend)
 * - Feedback visual durante o processo de login
 * - Redirecionamento para o painel administrativo após login bem-sucedido
 * - Link para retornar ao site principal
 *
 * Observação: Esta é uma implementação de demonstração. Em um ambiente de produção,
 * seria necessário implementar autenticação real com backend.
 */

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, User } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulando autenticação
    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 bg-[url('/pattern.png')] bg-repeat flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg border border-amber-900/30 bg-black/60 backdrop-blur-sm shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-scissors"
              >
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="18" cy="6" r="3"></circle>
                <path d="M20 12a2 2 0 0 0-3.37-1.46L12 15l-4.63-4.46A2 2 0 0 0 4 12"></path>
                <path d="M19.07 6.43c1.13 2.9 1.88 5.91 1.88 9.07 0 0-7.38-1-14.14-1-1.1 0-1.92.06-1.92.06 0-3.16.75-6.17 1.88-9.07"></path>
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-600 border-2 border-black"></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-amber-500 text-center mb-2">Área Administrativa</h1>
        <p className="text-gray-400 text-center mb-6">Faça login para acessar o painel</p>

        {error && (
          <div className="bg-red-950/30 border border-red-900/30 text-red-500 px-4 py-2 rounded-md mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-amber-500/70">
                <User className="h-5 w-5" />
              </span>
              <Input
                id="username"
                type="text"
                placeholder="Seu nome de usuário"
                required
                className="pl-10 border-amber-900/30 bg-black/60 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-amber-500/70">
                <Lock className="h-5 w-5" />
              </span>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                required
                className="pl-10 border-amber-900/30 bg-black/60 text-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-600 hover:bg-amber-500 text-black h-12 mt-6"
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-amber-500 hover:text-amber-400 text-sm">
            Voltar para o site
          </a>
        </div>
      </div>
    </div>
  )
}
