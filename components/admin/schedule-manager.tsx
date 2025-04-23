/**
 * Gerenciador de Horários
 *
 * Este componente permite ao administrador:
 * - Configurar os dias de funcionamento da barbearia
 * - Definir horários de abertura e fechamento para cada dia
 * - Ativar/desativar dias específicos (ex: fechado aos domingos)
 * - Gerenciar slots de horários disponíveis para agendamento
 * - Adicionar, remover ou desativar horários específicos
 * - Gerar automaticamente slots de horário com base no período de funcionamento
 *
 * Os horários são organizados por dia da semana, com controles para:
 * - Ativar/desativar o dia inteiro
 * - Editar horários de funcionamento
 * - Gerenciar slots individuais de 30 minutos
 */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Save, X, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type TimeSlot = {
  id: string
  time: string
  available: boolean
}

type DaySchedule = {
  day: string
  isOpen: boolean
  workingHours: {
    start: string
    end: string
  }
  timeSlots: TimeSlot[]
}

export function ScheduleManager() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: "Segunda",
      isOpen: true,
      workingHours: { start: "09:00", end: "19:00" },
      timeSlots: [
        { id: "seg-1", time: "09:00", available: true },
        { id: "seg-2", time: "09:30", available: true },
        { id: "seg-3", time: "10:00", available: true },
        { id: "seg-4", time: "10:30", available: true },
        { id: "seg-5", time: "11:00", available: true },
        { id: "seg-6", time: "11:30", available: true },
        { id: "seg-7", time: "14:00", available: true },
        { id: "seg-8", time: "14:30", available: true },
        { id: "seg-9", time: "15:00", available: true },
        { id: "seg-10", time: "15:30", available: true },
        { id: "seg-11", time: "16:00", available: true },
        { id: "seg-12", time: "16:30", available: true },
        { id: "seg-13", time: "17:00", available: true },
        { id: "seg-14", time: "17:30", available: true },
        { id: "seg-15", time: "18:00", available: true },
        { id: "seg-16", time: "18:30", available: true },
      ],
    },
    {
      day: "Terça",
      isOpen: true,
      workingHours: { start: "09:00", end: "19:00" },
      timeSlots: [
        { id: "ter-1", time: "09:00", available: true },
        { id: "ter-2", time: "09:30", available: true },
        { id: "ter-3", time: "10:00", available: true },
        { id: "ter-4", time: "10:30", available: true },
        { id: "ter-5", time: "11:00", available: true },
        { id: "ter-6", time: "11:30", available: true },
        { id: "ter-7", time: "14:00", available: true },
        { id: "ter-8", time: "14:30", available: true },
        { id: "ter-9", time: "15:00", available: true },
        { id: "ter-10", time: "15:30", available: true },
        { id: "ter-11", time: "16:00", available: true },
        { id: "ter-12", time: "16:30", available: true },
        { id: "ter-13", time: "17:00", available: true },
        { id: "ter-14", time: "17:30", available: true },
        { id: "ter-15", time: "18:00", available: true },
        { id: "ter-16", time: "18:30", available: true },
      ],
    },
    {
      day: "Quarta",
      isOpen: true,
      workingHours: { start: "09:00", end: "19:00" },
      timeSlots: [
        { id: "qua-1", time: "09:00", available: true },
        { id: "qua-2", time: "09:30", available: true },
        { id: "qua-3", time: "10:00", available: true },
        { id: "qua-4", time: "10:30", available: true },
        { id: "qua-5", time: "11:00", available: true },
        { id: "qua-6", time: "11:30", available: true },
        { id: "qua-7", time: "14:00", available: true },
        { id: "qua-8", time: "14:30", available: true },
        { id: "qua-9", time: "15:00", available: true },
        { id: "qua-10", time: "15:30", available: true },
        { id: "qua-11", time: "16:00", available: true },
        { id: "qua-12", time: "16:30", available: true },
        { id: "qua-13", time: "17:00", available: true },
        { id: "qua-14", time: "17:30", available: true },
        { id: "qua-15", time: "18:00", available: true },
        { id: "qua-16", time: "18:30", available: true },
      ],
    },
    {
      day: "Quinta",
      isOpen: true,
      workingHours: { start: "09:00", end: "19:00" },
      timeSlots: [
        { id: "qui-1", time: "09:00", available: true },
        { id: "qui-2", time: "09:30", available: true },
        { id: "qui-3", time: "10:00", available: true },
        { id: "qui-4", time: "10:30", available: true },
        { id: "qui-5", time: "11:00", available: true },
        { id: "qui-6", time: "11:30", available: true },
        { id: "qui-7", time: "14:00", available: true },
        { id: "qui-8", time: "14:30", available: true },
        { id: "qui-9", time: "15:00", available: true },
        { id: "qui-10", time: "15:30", available: true },
        { id: "qui-11", time: "16:00", available: true },
        { id: "qui-12", time: "16:30", available: true },
        { id: "qui-13", time: "17:00", available: true },
        { id: "qui-14", time: "17:30", available: true },
        { id: "qui-15", time: "18:00", available: true },
        { id: "qui-16", time: "18:30", available: true },
      ],
    },
    {
      day: "Sexta",
      isOpen: true,
      workingHours: { start: "09:00", end: "19:00" },
      timeSlots: [
        { id: "sex-1", time: "09:00", available: true },
        { id: "sex-2", time: "09:30", available: true },
        { id: "sex-3", time: "10:00", available: true },
        { id: "sex-4", time: "10:30", available: true },
        { id: "sex-5", time: "11:00", available: true },
        { id: "sex-6", time: "11:30", available: true },
        { id: "sex-7", time: "14:00", available: true },
        { id: "sex-8", time: "14:30", available: true },
        { id: "sex-9", time: "15:00", available: true },
        { id: "sex-10", time: "15:30", available: true },
        { id: "sex-11", time: "16:00", available: true },
        { id: "sex-12", time: "16:30", available: true },
        { id: "sex-13", time: "17:00", available: true },
        { id: "sex-14", time: "17:30", available: true },
        { id: "sex-15", time: "18:00", available: true },
        { id: "sex-16", time: "18:30", available: true },
      ],
    },
    {
      day: "Sábado",
      isOpen: true,
      workingHours: { start: "09:00", end: "18:00" },
      timeSlots: [
        { id: "sab-1", time: "09:00", available: true },
        { id: "sab-2", time: "09:30", available: true },
        { id: "sab-3", time: "10:00", available: true },
        { id: "sab-4", time: "10:30", available: true },
        { id: "sab-5", time: "11:00", available: true },
        { id: "sab-6", time: "11:30", available: true },
        { id: "sab-7", time: "14:00", available: true },
        { id: "sab-8", time: "14:30", available: true },
        { id: "sab-9", time: "15:00", available: true },
        { id: "sab-10", time: "15:30", available: true },
        { id: "sab-11", time: "16:00", available: true },
        { id: "sab-12", time: "16:30", available: true },
        { id: "sab-13", time: "17:00", available: true },
        { id: "sab-14", time: "17:30", available: true },
      ],
    },
    {
      day: "Domingo",
      isOpen: false,
      workingHours: { start: "00:00", end: "00:00" },
      timeSlots: [],
    },
  ])

  const [editingDay, setEditingDay] = useState<string | null>(null)
  const [newTimeSlot, setNewTimeSlot] = useState<string>("")
  const [addingToDay, setAddingToDay] = useState<string | null>(null)

  const handleToggleDayStatus = (day: string) => {
    setSchedule(
      schedule.map((item) => {
        if (item.day === day) {
          return { ...item, isOpen: !item.isOpen }
        }
        return item
      }),
    )
  }

  const handleUpdateWorkingHours = (day: string, field: "start" | "end", value: string) => {
    setSchedule(
      schedule.map((item) => {
        if (item.day === day) {
          return {
            ...item,
            workingHours: {
              ...item.workingHours,
              [field]: value,
            },
          }
        }
        return item
      }),
    )
  }

  const handleToggleTimeSlot = (day: string, id: string) => {
    setSchedule(
      schedule.map((item) => {
        if (item.day === day) {
          return {
            ...item,
            timeSlots: item.timeSlots.map((slot) => {
              if (slot.id === id) {
                return { ...slot, available: !slot.available }
              }
              return slot
            }),
          }
        }
        return item
      }),
    )
  }

  const handleAddTimeSlot = (day: string) => {
    if (!newTimeSlot) return

    const dayPrefix = day.substring(0, 3).toLowerCase()
    const newId = `${dayPrefix}-${Math.random().toString(36).substring(2, 9)}`

    setSchedule(
      schedule.map((item) => {
        if (item.day === day) {
          return {
            ...item,
            timeSlots: [...item.timeSlots, { id: newId, time: newTimeSlot, available: true }].sort((a, b) => {
              const timeA = a.time.split(":").map(Number)
              const timeB = b.time.split(":").map(Number)
              if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0]
              return timeA[1] - timeB[1]
            }),
          }
        }
        return item
      }),
    )

    setNewTimeSlot("")
    setAddingToDay(null)
  }

  const handleRemoveTimeSlot = (day: string, id: string) => {
    setSchedule(
      schedule.map((item) => {
        if (item.day === day) {
          return {
            ...item,
            timeSlots: item.timeSlots.filter((slot) => slot.id !== id),
          }
        }
        return item
      }),
    )
  }

  const handleGenerateTimeSlots = (day: string) => {
    const dayItem = schedule.find((item) => item.day === day)
    if (!dayItem || !dayItem.isOpen) return

    const { start, end } = dayItem.workingHours
    const startHour = Number.parseInt(start.split(":")[0])
    const startMinute = Number.parseInt(start.split(":")[1])
    const endHour = Number.parseInt(end.split(":")[0])
    const endMinute = Number.parseInt(end.split(":")[1])

    const slots: TimeSlot[] = []
    const dayPrefix = day.substring(0, 3).toLowerCase()

    let currentHour = startHour
    let currentMinute = startMinute
    let slotCount = 1

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const timeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`
      slots.push({
        id: `${dayPrefix}-${slotCount}`,
        time: timeString,
        available: true,
      })

      // Avança 30 minutos
      currentMinute += 30
      if (currentMinute >= 60) {
        currentHour += 1
        currentMinute -= 60
      }
      slotCount++
    }

    setSchedule(
      schedule.map((item) => {
        if (item.day === day) {
          return {
            ...item,
            timeSlots: slots,
          }
        }
        return item
      }),
    )
  }

  return (
    <div className="rounded-lg border border-amber-900/30 bg-black/60 backdrop-blur-sm p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-amber-500">Gerenciar Horários</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent ml-4"></div>
      </div>

      <div className="space-y-6">
        {schedule.map((daySchedule) => (
          <div
            key={daySchedule.day}
            className={cn(
              "border border-amber-900/30 rounded-md p-4",
              daySchedule.isOpen ? "bg-gray-900/50" : "bg-gray-900/20",
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Switch
                  checked={daySchedule.isOpen}
                  onCheckedChange={() => handleToggleDayStatus(daySchedule.day)}
                  className="data-[state=checked]:bg-amber-600"
                />
                <h3 className={cn("text-lg font-medium", daySchedule.isOpen ? "text-amber-500" : "text-gray-500")}>
                  {daySchedule.day}
                </h3>
              </div>

              {daySchedule.isOpen && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setEditingDay(editingDay === daySchedule.day ? null : daySchedule.day)}
                    size="sm"
                    variant="outline"
                    className="border-amber-900/30 bg-black/60 text-amber-500 hover:bg-amber-950/50"
                  >
                    {editingDay === daySchedule.day ? (
                      <>
                        <X className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Cancelar</span>
                      </>
                    ) : (
                      <>
                        <Pencil className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Editar</span>
                      </>
                    )}
                  </Button>

                  {editingDay !== daySchedule.day && (
                    <Button
                      onClick={() => handleGenerateTimeSlots(daySchedule.day)}
                      size="sm"
                      variant="outline"
                      className="border-amber-900/30 bg-black/60 text-amber-500 hover:bg-amber-950/50"
                    >
                      <span className="hidden sm:inline">Gerar Horários</span>
                      <span className="sm:hidden">Gerar</span>
                    </Button>
                  )}
                </div>
              )}
            </div>

            {daySchedule.isOpen && (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${daySchedule.day}-start`}>Horário de Abertura</Label>
                    <Input
                      id={`${daySchedule.day}-start`}
                      type="time"
                      value={daySchedule.workingHours.start}
                      onChange={(e) => handleUpdateWorkingHours(daySchedule.day, "start", e.target.value)}
                      className="border-amber-900/30 bg-black/60 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${daySchedule.day}-end`}>Horário de Fechamento</Label>
                    <Input
                      id={`${daySchedule.day}-end`}
                      type="time"
                      value={daySchedule.workingHours.end}
                      onChange={(e) => handleUpdateWorkingHours(daySchedule.day, "end", e.target.value)}
                      className="border-amber-900/30 bg-black/60 text-white"
                    />
                  </div>
                </div>

                {editingDay === daySchedule.day ? (
                  <div className="mt-4 space-y-4">
                    <h4 className="text-sm font-medium text-amber-500">Gerenciar Horários Disponíveis</h4>

                    <div className="flex flex-wrap gap-2">
                      {daySchedule.timeSlots.map((slot) => (
                        <div key={slot.id} className="flex items-center gap-1 bg-gray-800 rounded-md p-2">
                          <span className={cn("text-sm", slot.available ? "text-white" : "text-gray-500 line-through")}>
                            {slot.time}
                          </span>
                          <Checkbox
                            checked={slot.available}
                            onCheckedChange={() => handleToggleTimeSlot(daySchedule.day, slot.id)}
                            className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveTimeSlot(daySchedule.day, slot.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-400 hover:bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remover</span>
                          </Button>
                        </div>
                      ))}
                    </div>

                    {addingToDay === daySchedule.day ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={newTimeSlot}
                          onChange={(e) => setNewTimeSlot(e.target.value)}
                          className="border-amber-900/30 bg-black/60 text-white max-w-[150px]"
                        />
                        <Button
                          onClick={() => handleAddTimeSlot(daySchedule.day)}
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-500 text-black"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                        <Button
                          onClick={() => setAddingToDay(null)}
                          size="sm"
                          variant="outline"
                          className="border-amber-900/30 bg-black/60 text-amber-500 hover:bg-amber-950/50"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Cancelar</span>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setAddingToDay(daySchedule.day)}
                        size="sm"
                        variant="outline"
                        className="border-amber-900/30 bg-black/60 text-amber-500 hover:bg-amber-950/50"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Adicionar Horário
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-amber-500 mb-2">Horários Disponíveis</h4>
                    <div className="flex flex-wrap gap-2">
                      {daySchedule.timeSlots.map((slot) => (
                        <span
                          key={slot.id}
                          className={cn(
                            "text-sm bg-gray-800 rounded-md px-2 py-1",
                            slot.available ? "text-white" : "text-gray-500 line-through",
                          )}
                        >
                          {slot.time}
                        </span>
                      ))}
                      {daySchedule.timeSlots.length === 0 && (
                        <span className="text-sm text-gray-500">Nenhum horário configurado</span>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
