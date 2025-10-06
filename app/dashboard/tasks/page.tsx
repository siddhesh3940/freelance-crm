'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TaskForm } from '@/components/tasks/task-form'
import { Plus, CheckSquare, Clock, AlertCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function TasksPage() {
  const [showForm, setShowForm] = useState(false)

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('/api/tasks')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      return response.json()
    }
  })

  const todoTasks = tasks?.filter((t: any) => t.status === 'TODO') || []
  const inProgressTasks = tasks?.filter((t: any) => t.status === 'IN_PROGRESS') || []
  const completedTasks = tasks?.filter((t: any) => t.status === 'COMPLETED') || []

  const TaskCard = ({ task }: { task: any }) => (
    <div className="bg-white p-3 rounded border mb-3">
      <h4 className="font-medium">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      )}
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <span className={`px-2 py-1 rounded ${
          task.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
          task.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
          task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {task.priority}
        </span>
        {task.dueDate && (
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(task.dueDate)}
          </div>
        )}
      </div>
      {task.project && (
        <div className="text-xs text-blue-600 mt-1">
          {task.project.name} - {task.project.client.name}
        </div>
      )}
    </div>
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-gray-600">Track your work and deadlines</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm onSuccess={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading tasks...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <CheckSquare className="w-4 h-4 mr-2" />
                To Do ({todoTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todoTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No tasks</div>
              ) : (
                todoTasks.map((task: any) => <TaskCard key={task.id} task={task} />)
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                In Progress ({inProgressTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {inProgressTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No tasks</div>
              ) : (
                inProgressTasks.map((task: any) => <TaskCard key={task.id} task={task} />)
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <CheckSquare className="w-4 h-4 mr-2" />
                Completed ({completedTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No tasks</div>
              ) : (
                completedTasks.map((task: any) => <TaskCard key={task.id} task={task} />)
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}