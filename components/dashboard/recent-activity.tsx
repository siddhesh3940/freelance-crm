import { formatDate } from '@/lib/utils'

// Mock data - replace with real data from your API
const activities = [
  {
    id: 1,
    type: 'invoice',
    message: 'Invoice #INV-001 sent to Acme Corp',
    timestamp: new Date('2024-01-15T10:30:00'),
  },
  {
    id: 2,
    type: 'project',
    message: 'Project "Website Redesign" marked as completed',
    timestamp: new Date('2024-01-14T16:45:00'),
  },
  {
    id: 3,
    type: 'client',
    message: 'New client "Tech Startup Inc" added',
    timestamp: new Date('2024-01-14T09:15:00'),
  },
  {
    id: 4,
    type: 'task',
    message: 'Task "Design mockups" completed',
    timestamp: new Date('2024-01-13T14:20:00'),
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">{activity.message}</p>
            <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}