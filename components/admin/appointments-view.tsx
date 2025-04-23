/**
 * Visualizador de Agendamentos
 *
 * Este componente permite ao administrador:
 * - Visualizar todos os agendamentos em um calendário
 * - Filtrar agendamentos por data
 * - Ver detalhes de cada agendamento (cliente, serviço, horário)
 * - Gerenciar status dos agendamentos (confirmar, cancelar)
 * - Ver observações especiais de cada cliente
 *
 * O componente é dividido em:
 * - Calendário para seleção de data com indicadores de agendamentos
 * - Lista de agendamentos para a data selecionada
 * - Detalhes e ações para cada agendamento
 */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarIcon, Check, X, Phone, User, Clock, Scissors } from "lucide-react"

type Appointment = {
  id: string
  clientName: string
  clientPhone: string
  service: string
  date: Date
  time: string
  status: "confirmed" | "pending" | "cancelled"
  notes?: string
}

export function AppointmentsView() {
  const [date, setDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      clientName: "João Silva",
      clientPhone: "(11) 99999-8888",
      service: "Corte de Cabelo",
      date: new Date(),
      time: "10:00",
      status: "confirmed",
      notes: "Cliente prefere corte degradê",
    },
    {
      id: "2",
      clientName: "Pedro Oliveira",
      clientPhone: "(11) 97777-6666",
      service: "Barba",
      date: new Date(),
      time: "11:00",
      status: "confirmed",
    },
    {
      id: "3",
      clientName: "Carlos Mendes",
      clientPhone: "(11) 95555-4444",
      service: "Combo (Cabelo + Barba)",
      date: new Date(),
      time: "14:30",
      status: "pending",
    },
    {
      id: "4",
      clientName: "André Santos",
      clientPhone: "(11) 93333-2222",
      service: "Hot Towel",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: "16:00",
      status: "confirmed",
    },
  ])

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear(),
  )

  const handleStatusChange = (id: string, status: "confirmed" | "pending" | "cancelled") => {
    setAppointments(
      appointments.map((appointment) => (appointment.id === id ? { ...appointment, status } : appointment)),
    )
  }

  // Função para contar agendamentos por dia para o calendário
  const getAppointmentCountForDate = (date: Date) => {
    return appointments.filter(
      (appointment) =>
        appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear(),
    ).length
  }

  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr]">
      <div className="rounded-lg border border-amber-900/30 bg-black/60 backdrop-blur-sm p-6 shadow-lg">
        <h2 className="text-xl font-bold text-amber-500 mb-4">Calendário</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="bg-transparent"
          locale={ptBR}
          modifiers={{
            hasAppointments: (date) => getAppointmentCountForDate(date) > 0,
          }}
          modifiersClassNames={{
            hasAppointments: "bg-amber-900/30 font-bold text-amber-500",
          }}
          components={{
            DayContent: (props) => {
              const count = getAppointmentCountForDate(props.date)
              return (
                <div className="relative">
                  <div>{props.date.getDate()}</div>
                  {count > 0 && (
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] text-black">
                      {count}
                    </div>
                  )}
                </div>
              )
            },
          }}
        />
        <div className="mt-4">
          <h3 className="text-sm font-medium text-amber-500 mb-2">Legenda</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="h-3 w-3 rounded-full bg-amber-900/30"></div>
            <span>Dia com agendamentos</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-amber-900/30 bg-black/60 backdrop-blur-sm p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-amber-500">
            Agendamentos para {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent ml-4"></div>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={cn(
                  "border rounded-md p-4",
                  appointment.status === "confirmed"
                    ? "border-green-900/30 bg-green-950/10"
                    : appointment.status === "pending"
                      ? "border-amber-900/30 bg-amber-950/10"
                      : "border-red-900/30 bg-red-950/10",
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                      <User className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.clientName}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <Phone className="h-3 w-3 mr-1" />
                        {appointment.clientPhone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={cn(
                        "rounded-md",
                        appointment.status === "confirmed"
                          ? "bg-green-600 hover:bg-green-600"
                          : appointment.status === "pending"
                            ? "bg-amber-600 hover:bg-amber-600"
                            : "bg-red-600 hover:bg-red-600",
                      )}
                    >
                      {appointment.status === "confirmed"
                        ? "Confirmado"
                        : appointment.status === "pending"
                          ? "Pendente"
                          : "Cancelado"}
                    </Badge>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1 text-amber-500" />
                      {appointment.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm">
                  <Scissors className="h-4 w-4 text-amber-500" />
                  <span>{appointment.service}</span>
                </div>

                {appointment.notes && (
                  <div className="bg-gray-900/50 rounded-md p-2 text-sm text-gray-300 mb-3">
                    <p className="font-medium text-amber-500 mb-1">Observações:</p>
                    <p>{appointment.notes}</p>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  {appointment.status !== "confirmed" && (
                    <Button
                      onClick={() => handleStatusChange(appointment.id, "confirmed")}
                      size="sm"
                      className="bg-green-600 hover:bg-green-500 text-white"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Confirmar
                    </Button>
                  )}
                  {appointment.status !== "cancelled" && (
                    <Button
                      onClick={() => handleStatusChange(appointment.id, "cancelled")}
                      size="sm"
                      variant="outline"
                      className="border-red-900/30 bg-black/60 text-red-500 hover:bg-red-950/30"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CalendarIcon className="h-12 w-12 mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-amber-500 mb-2">Nenhum agendamento para esta data</h3>
            <p className="text-gray-400">Selecione outra data no calendário ou adicione um novo agendamento.</p>
          </div>
        )}
      </div>
    </div>
  )
}
