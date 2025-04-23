/**
 * Página Principal do Painel Administrativo
 *
 * Esta página contém:
 * - Cabeçalho administrativo
 * - Sistema de abas para navegar entre diferentes funcionalidades:
 *   1. Gerenciamento de Serviços: Adicionar, editar e remover serviços oferecidos
 *   2. Gerenciamento de Horários: Configurar dias e horários de funcionamento
 *   3. Visualização de Agendamentos: Ver e gerenciar agendamentos de clientes
 *   4. Gerenciamento de Equipe: Funcionalidade em desenvolvimento
 *
 * Cada aba carrega um componente específico para sua funcionalidade.
 */

"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { ServicesManager } from "@/components/admin/services-manager"
import { ScheduleManager } from "@/components/admin/schedule-manager"
import { AppointmentsView } from "@/components/admin/appointments-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Scissors, Users } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("services")

  return (
    <div className="min-h-screen bg-black text-gray-200 bg-[url('/pattern.png')] bg-repeat">
      <div className="bg-gradient-to-b from-black/95 to-black/90 min-h-screen">
        <AdminHeader />
        <main className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-amber-500 mb-2">Painel Administrativo</h1>
            <p className="text-gray-400">Gerencie seus serviços, horários e agendamentos</p>
          </div>

          <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-4 mb-6 bg-gray-900/50 border border-amber-900/30">
              <TabsTrigger
                value="services"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-black flex items-center gap-2"
              >
                <Scissors className="h-4 w-4" />
                <span className="hidden sm:inline">Serviços</span>
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-black flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Horários</span>
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-black flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Agendamentos</span>
              </TabsTrigger>
              <TabsTrigger
                value="staff"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-black flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Equipe</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-0">
              <ServicesManager />
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <ScheduleManager />
            </TabsContent>

            <TabsContent value="appointments" className="mt-0">
              <AppointmentsView />
            </TabsContent>

            <TabsContent value="staff" className="mt-0">
              <div className="rounded-lg border border-amber-900/30 bg-black/60 backdrop-blur-sm p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-amber-500">Gerenciar Equipe</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent ml-4"></div>
                </div>
                <p className="text-gray-400">Funcionalidade em desenvolvimento.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
