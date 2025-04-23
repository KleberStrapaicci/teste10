/**
 * Cabeçalho da Área Administrativa
 *
 * Este componente exibe o cabeçalho da área administrativa com:
 * - Logo e identificação da área administrativa
 * - Menu de navegação para o site principal
 * - Informações do usuário logado
 * - Botão de logout
 * - Menu responsivo para dispositivos móveis
 */

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, LogOut } from "lucide-react"

export function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black/80 backdrop-blur-md py-4 shadow-md border-b border-amber-900/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-600 border-2 border-black"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-500">ADMIN</h1>
              <p className="text-xs text-gray-500">Vintage Barber Shop</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-1">
              Ver Site
            </Link>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Olá, Admin</span>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-amber-500 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sair</span>
            </button>
          </nav>

          <button
            className="md:hidden text-amber-500 p-2 rounded-md hover:bg-amber-900/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu móvel */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-amber-900/30 animate-in slide-in-from-top">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-amber-500 transition-colors flex items-center gap-2 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ver Site
                </Link>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-300">Olá, Admin</span>
                <button className="text-gray-400 hover:text-amber-500 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
