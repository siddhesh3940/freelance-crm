'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProjectForm } from '@/components/projects/project-form'
import { useCurrency } from '@/contexts/currency-context'
import { Plus, FolderOpen, Calendar, DollarSign } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false)
  const { formatAmount } = useCurrency()

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Failed to fetch projects')
      return response.json()
    }
  })

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-600">Manage your client projects</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectForm onSuccess={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : !projects?.length ? (
        <Card>
          <CardContent className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Create your first project to get started</p>
            <Button onClick={() => setShowForm(true)}>Create Project</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {projects.map((project: any) => (
            <Card key={project.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <p className="text-gray-600">{project.client.name}</p>
                    {project.description && (
                      <p className="text-sm text-gray-500">{project.description}</p>
                    )}
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.startDate ? formatDate(project.startDate) : 'No start date'}
                    </div>
                    {project.budget && (
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {formatAmount(project.budget)}
                      </div>
                    )}
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        project.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}