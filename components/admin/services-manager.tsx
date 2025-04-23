/**
 * Gerenciador de Serviços
 *
 * Este componente permite ao administrador:
 * - Visualizar todos os serviços oferecidos
 * - Adicionar novos serviços
 * - Editar serviços existentes (nome, preço, duração, descrição)
 * - Excluir serviços
 *
 * Cada serviço contém:
 * - Nome do serviço
 * - Descrição
 * - Duração em minutos
 * - Preço em reais
 */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, Save, X } from "lucide-react"

type Service = {
  id: string
  name: string
  price: number
  duration: number
  description: string
}

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Corte de Cabelo",
      price: 45,
      duration: 30,
      description: "Corte tradicional com tesoura e máquina",
    },
    {
      id: "2",
      name: "Barba",
      price: 35,
      duration: 20,
      description: "Modelagem e acabamento de barba",
    },
    {
      id: "3",
      name: "Combo (Cabelo + Barba)",
      price: 70,
      duration: 50,
      description: "Corte de cabelo e barba completa",
    },
    {
      id: "4",
      name: "Hot Towel",
      price: 25,
      duration: 15,
      description: "Tratamento com toalha quente",
    },
    {
      id: "5",
      name: "Pigmentação",
      price: 50,
      duration: 40,
      description: "Pigmentação para disfarçar falhas",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newService, setNewService] = useState<Omit<Service, "id">>({
    name: "",
    price: 0,
    duration: 30,
    description: "",
  })
  const [editForm, setEditForm] = useState<Service>({
    id: "",
    name: "",
    price: 0,
    duration: 0,
    description: "",
  })

  const handleEdit = (service: Service) => {
    setEditingId(service.id)
    setEditForm(service)
  }

  const handleSaveEdit = () => {
    setServices(services.map((service) => (service.id === editingId ? editForm : service)))
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const handleAddNew = () => {
    const id = Math.random().toString(36).substring(2, 9)
    setServices([...services, { id, ...newService }])
    setNewService({
      name: "",
      price: 0,
      duration: 30,
      description: "",
    })
    setIsAdding(false)
  }

  return (
    <div className="rounded-lg border border-amber-900/30 bg-black/60 backdrop-blur-sm p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-amber-500">Gerenciar Serviços</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent mx-4"></div>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          variant="outline"
          className="border-amber-900/30 bg-black/60 text-amber-500 hover:bg-amber-950/50 hover:text-amber-400"
        >
          {isAdding ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {isAdding ? "Cancelar" : "Novo Serviço"}
        </Button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 border border-amber-900/30 rounded-md bg-gray-900/50 animate-in fade-in-0 slide-in-from-top-5">
          <h3 className="text-lg font-medium text-amber-500 mb-4">Adicionar Novo Serviço</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-name">Nome do Serviço</Label>
              <Input
                id="new-name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="border-amber-900/30 bg-black/60 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-price">Preço (R$)</Label>
              <Input
                id="new-price"
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: Number.parseFloat(e.target.value) })}
                className="border-amber-900/30 bg-black/60 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-duration">Duração (minutos)</Label>
              <Input
                id="new-duration"
                type="number"
                value={newService.duration}
                onChange={(e) => setNewService({ ...newService, duration: Number.parseInt(e.target.value) })}
                className="border-amber-900/30 bg-black/60 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-description">Descrição</Label>
              <Input
                id="new-description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="border-amber-900/30 bg-black/60 text-white"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleAddNew} className="bg-amber-600 hover:bg-amber-500 text-black">
              <Save className="h-4 w-4 mr-2" />
              Salvar Serviço
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-amber-900/30">
              <th className="text-left py-3 px-4 text-amber-500">Serviço</th>
              <th className="text-left py-3 px-4 text-amber-500 hidden sm:table-cell">Descrição</th>
              <th className="text-left py-3 px-4 text-amber-500">Duração</th>
              <th className="text-left py-3 px-4 text-amber-500">Preço</th>
              <th className="text-right py-3 px-4 text-amber-500">Ações</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-gray-800">
                {editingId === service.id ? (
                  <>
                    <td className="py-3 px-4">
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="border-amber-900/30 bg-black/60 text-white"
                      />
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <Input
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="border-amber-900/30 bg-black/60 text-white"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        type="number"
                        value={editForm.duration}
                        onChange={(e) => setEditForm({ ...editForm, duration: Number.parseInt(e.target.value) })}
                        className="border-amber-900/30 bg-black/60 text-white"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: Number.parseFloat(e.target.value) })}
                        className="border-amber-900/30 bg-black/60 text-white"
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        onClick={handleSaveEdit}
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-500 text-black mr-2"
                      >
                        <Save className="h-4 w-4" />
                        <span className="sr-only">Salvar</span>
                      </Button>
                      <Button
                        onClick={() => setEditingId(null)}
                        size="sm"
                        variant="outline"
                        className="border-amber-900/30 bg-black/60 text-amber-500 hover:bg-amber-950/50"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Cancelar</span>
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4 font-medium">{service.name}</td>
                    <td className="py-3 px-4 text-gray-400 hidden sm:table-cell">{service.description}</td>
                    <td className="py-3 px-4">{service.duration} min</td>
                    <td className="py-3 px-4">R$ {service.price.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        onClick={() => handleEdit(service)}
                        size="sm"
                        variant="outline"
                        className="border-amber-900/30 bg-black/60 text-amber-500 hover:bg-amber-950/50 mr-2"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        onClick={() => handleDelete(service.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-900/30 bg-black/60 text-red-500 hover:bg-red-950/30"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
