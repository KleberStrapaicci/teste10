/**
 * Página principal do Vintage Barber Shop
 *
 * Esta página contém:
 * - Header: Cabeçalho com navegação
 * - Seção principal dividida em duas colunas:
 *   - Formulário de agendamento: Permite aos clientes agendar serviços
 *   - Lista de serviços e consulta de agendamentos: Mostra os serviços disponíveis e permite consultar agendamentos existentes
 * - Footer: Rodapé com informações de contato e horário de funcionamento
 */

import { Appointment } from "@/components/appointment"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-gray-200 bg-[url('/pattern.png')] bg-repeat">
      <div className="bg-gradient-to-b from-black/95 to-black/90 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <Appointment />
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="rounded-lg border border-amber-900/30 bg-black/60 backdrop-blur-sm p-6 shadow-lg shadow-amber-900/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-amber-500">Nossos Serviços</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent ml-4"></div>
                </div>

                {/* Lista de serviços com preços */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-amber-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
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
                      </span>
                      <span>Corte Clássico</span>
                    </div>
                    <span className="text-amber-500 font-semibold">R$ 45</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-amber-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
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
                      </span>
                      <span>Barba Completa</span>
                    </div>
                    <span className="text-amber-500 font-semibold">R$ 35</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-amber-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
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
                      </span>
                      <span>Combo (Cabelo + Barba)</span>
                    </div>
                    <span className="text-amber-500 font-semibold">R$ 70</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-amber-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-flame"
                        >
                          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                        </svg>
                      </span>
                      <span>Hot Towel</span>
                    </div>
                    <span className="text-amber-500 font-semibold">R$ 25</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-amber-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-droplets"
                        >
                          <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                          <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                        </svg>
                      </span>
                      <span>Pigmentação</span>
                    </div>
                    <span className="text-amber-500 font-semibold">R$ 50</span>
                  </div>
                </div>

                {/* Seção de consulta de agendamentos */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-amber-500">Consultar Agendamento</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent ml-4"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="phone-search"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Telefone/WhatsApp
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-amber-500/70">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-phone"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </span>
                        <input
                          type="tel"
                          id="phone-search"
                          placeholder="(99) 99999-9999"
                          className="flex h-12 w-full rounded-md border border-amber-900/30 bg-black/60 backdrop-blur-sm px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="inline-flex h-12 items-center justify-center rounded-md bg-amber-600 px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Consultar
                      </button>
                      <button className="inline-flex h-12 items-center justify-center rounded-md border border-amber-900/30 bg-black/60 backdrop-blur-sm px-6 py-2 text-sm font-medium text-amber-500 transition-colors hover:bg-amber-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Modificar
                      </button>
                      <button className="inline-flex h-12 items-center justify-center rounded-md border border-amber-900/30 bg-black/60 backdrop-blur-sm px-6 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-950/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
