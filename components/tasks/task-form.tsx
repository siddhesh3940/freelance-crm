'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'

interface TaskFormProps {
  onSuccess: () => void
}

export function TaskForm({ onSuccess }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    priority: 'MEDIUM',
    dueDate: '',
    estimatedHours: ''
  })

  const queryClient = useQueryClient()

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects')
      return response.json()
    }
  })

  const createTask = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          projectId: data.projectId || null,
          estimatedHours: data.estimatedHours ? parseFloat(data.estimatedHours) : null
        })
      })
      if (!response.ok) throw new Error('Failed to create task')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      onSuccess()
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createTask.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Task Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full border rounded-md px-3 py-2"
        required
      />

      <textarea
        placeholder="Task Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full border rounded-md px-3 py-2 h-20"
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          value={formData.projectId}
          onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
          className="border rounded-md px-3 py-2"
        >
          <option value="">No Project</option>
          {Array.isArray(projects) && projects.map((project: any) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>

        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          className="border rounded-md px-3 py-2"
        >
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="HIGH">High Priority</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          placeholder="Due Date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="number"
          placeholder="Estimated Hours"
          value={formData.estimatedHours}
          onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={createTask.isPending}>
          {createTask.isPending ? 'Creating...' : 'Create Task'}
        </Button>
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
      </div>
    </form>
  )
}