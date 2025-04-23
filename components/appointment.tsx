"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Tipos de serviços e suas durações
const servicesDurations = {
  corte: 30,
  barba: 20,
  combo: 50,
  hot: 15,
  pigmentacao: 40,
}

/**
 * Componente de Agendamento
 *
 * Este componente permite que os clientes agendem serviços na barbearia.
 * Funcionalidades:
 * - Formulário para inserir dados do cliente (nome, telefone)
 * - Seleção de serviço com duração automática
 * - Seleção de data com calendário
 * - Seleção de horário disponível com base no serviço escolhido
 * - Campo para observações adicionais
 * - Botão de envio com feedback visual
 *
 * O componente gerencia:
 * - Estado do formulário
 * - Validação de campos
 * - Disponibilidade de horários com base no serviço
 * - Simulação de envio para API
 * - Feedback de sucesso
 */
export function Appointment() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [service, setService] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  // Simula a obtenção de horários disponíveis com base no serviço selecionado
  useEffect(() => {
    if (service) {
      // Horários base
      const baseTimeSlots = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
      ]

      // Filtra horários com base na duração do serviço
      const duration = servicesDurations[service as keyof typeof servicesDurations] || 30

      // Se o serviço dura mais de 30 minutos, remove horários que não teriam tempo suficiente
      if (duration > 30) {
        const filteredTimes = baseTimeSlots.filter((timeSlot) => {
          const [hours, minutes] = timeSlot.split(":").map(Number)

          // Verifica se há tempo suficiente antes do próximo bloco de horário
          // (almoço ou fechamento)
          if (hours < 12) {
            // Manhã: verifica se termina antes do almoço (12:00)
            const endMinutes = hours * 60 + minutes + duration
            return endMinutes <= 12 * 60
          } else {
            // Tarde: verifica se termina antes do fechamento (19:00)
            const endMinutes = hours * 60 + minutes + duration
            return endMinutes <= 19 * 60
          }
        })

        setAvailableTimes(filteredTimes)
      } else {
        setAvailableTimes(baseTimeSlots)
      }

      // Limpa o horário selecionado quando muda o serviço
      setTime("")
    } else {
      setAvailableTimes([])
    }
  }, [service])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulando envio para API
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast({
        title: "Agendamento realizado com sucesso!",
        description: "Você receberá uma confirmação por WhatsApp.",
        className: "bg-amber-950 border-amber-900 text-amber-50",
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="rounded-lg border border-amber-900/30 bg-black/60 backdrop-blur-sm p-6 shadow-lg shadow-amber-900/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-amber-500">Agendar Horário</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent ml-4"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Nome completo
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
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input
              type="text"
              id="name"
              required
              placeholder="Seu nome completo"
              className="flex h-12 w-full rounded-md border border-amber-900/30 bg-black/60 backdrop-blur-sm px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
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
              id="phone"
              required
              placeholder="(99) 99999-9999"
              className="flex h-12 w-full rounded-md border border-amber-900/30 bg-black/60 backdrop-blur-sm px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="service"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Serviço desejado
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
                className="lucide lucide-scissors"
              >
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="18" cy="6" r="3"></circle>
                <path d="M20 12a2 2 0 0 0-3.37-1.46L12 15l-4.63-4.46A2 2 0 0 0 4 12"></path>
                <path d="M19.07 6.43c1.13 2.9 1.88 5.91 1.88 9.07 0 0-7.38-1-14.14-1-1.1 0-1.92.06-1.92.06 0-3.16.75-6.17 1.88-9.07"></path>
              </svg>
            </span>
            <select
              id="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="flex h-12 w-full rounded-md border border-amber-900/30 bg-black/60 backdrop-blur-sm px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f59e0b' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.5em 1.5em",
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione um serviço
              </option>
              <option value="corte">Corte de Cabelo (30 min)</option>
              <option value="barba">Barba (20 min)</option>
              <option value="combo">Combo (Cabelo + Barba) (50 min)</option>
              <option value="hot">Hot Towel (15 min)</option>
              <option value="pigmentacao">Pigmentação (40 min)</option>
            </select>
          </div>
          {service && (
            <p className="text-xs text-amber-500 mt-1">
              Duração: {servicesDurations[service as keyof typeof servicesDurations]} minutos
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Data
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  id="date"
                  type="button"
                  className={cn(
                    "flex h-12 w-full items-center justify-start rounded-md border border-amber-900/30 bg-black/60 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                    !date && "text-gray-500",
                  )}
                >
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
                    className="mr-2 h-4 w-4 text-amber-500/70"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-900 border border-amber-900/30">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) =>
                    date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                  }
                  className="bg-gray-900 text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="time"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Horário
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
                  className="lucide lucide-clock"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </span>
              <select
                id="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={!service || availableTimes.length === 0}
                className="flex h-12 w-full rounded-md border border-amber-900/30 bg-black/60 backdrop-blur-sm px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f59e0b' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="" disabled>
                  {!service
                    ? "Selecione um serviço primeiro"
                    : availableTimes.length === 0
                      ? "Nenhum horário disponível"
                      : "Selecione um horário"}
                </option>
                {availableTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            {service && availableTimes.length > 0 && (
              <p className="text-xs text-amber-500 mt-1">{availableTimes.length} horários disponíveis</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Observações
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
                className="lucide lucide-file-text"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" x2="8" y1="13" y2="13"></line>
                <line x1="16" x2="8" y1="17" y2="17"></line>
                <line x1="10" x2="8" y1="9" y2="9"></line>
              </svg>
            </span>
            <textarea
              id="notes"
              placeholder="Alguma observação especial?"
              className="flex min-h-[80px] w-full rounded-md border border-amber-900/30 bg-black/60 backdrop-blur-sm px-10 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSuccess || !service || !date || !time}
          className={cn(
            "inline-flex h-12 w-full items-center justify-center rounded-md px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none relative overflow-hidden group",
            isSuccess ? "bg-green-600 text-white" : "bg-amber-600 hover:bg-amber-500 text-black",
            (!service || !date || !time) && !isSubmitting && !isSuccess ? "opacity-50 cursor-not-allowed" : "",
          )}
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 group-hover:translate-x-0 group-hover:scale-102"></span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 transition duration-300 ease-out transform group-hover:opacity-100"></span>
          <span className="relative flex items-center">
            {isSubmitting ? (
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
                Processando...
              </>
            ) : isSuccess ? (
              <>
                <svg
                  className="mr-2 h-4 w-4"
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
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Agendado com sucesso!
              </>
            ) : (
              <>
                <svg
                  className="mr-2 h-4 w-4"
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
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Agendar
              </>
            )}
          </span>
        </button>
      </form>
      <Toaster />
    </div>
  )
}
