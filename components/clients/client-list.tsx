'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { ClientInsights } from '@/components/ai/client-insights'
import { Mail, Phone, Building, Edit, Trash2, Brain } from 'lucide-react'

interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  status: string
  createdAt: string
  _count: {
    projects: number
    invoices: number
  }
}

interface ClientListProps {
  clients: Client[]
  isLoading: boolean
}

export function ClientList({ clients, isLoading }: ClientListProps) {
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  if (isLoading) {
    return <div className="text-center py-8">Loading clients...</div>
  }

  if (!clients.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No clients found. Add your first client to get started.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {clients.map((client) => (
        <Card key={client.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{client.name}</CardTitle>
                {client.company && (
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Building className="w-4 h-4 mr-1" />
                    {client.company}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedClient(selectedClient === client.id ? null : client.id)}
                >
                  <Brain className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {client.email && (
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {client.email}
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {client.phone}
                  </div>
                )}
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>{client._count.projects} projects</div>
                <div>{client._count.invoices} invoices</div>
                <div className="mt-2">Added {formatDate(client.createdAt)}</div>
              </div>
            </div>
            {selectedClient === client.id && (
              <div className="mt-4 pt-4 border-t">
                <ClientInsights clientId={client.id} clientName={client.name} />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}