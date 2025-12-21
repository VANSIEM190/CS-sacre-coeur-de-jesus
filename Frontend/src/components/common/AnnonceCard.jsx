import { cn } from '@/lib/cn'
import { Calendar, User } from 'lucide-react'
import formatDate from '@/utils/FormatDate'

const categoryColors = {
  general: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '📢' },
  academic: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '📚' },
  events: { bg: 'bg-green-100', text: 'text-green-700', icon: '🎉' },
  urgent: { bg: 'bg-red-100', text: 'text-red-700', icon: '⚠️' },
  sports: { bg: 'bg-orange-100', text: 'text-orange-700', icon: '⚽' },
}

const priorityBorders = {
  low: 'border-l-gray-400',
  normal: 'border-l-blue-500',
  high: 'border-l-orange-500',
  urgent: 'border-l-red-500',
}

export default function AnnouncementCard({ announcement }) {
  const category =
    categoryColors[announcement.category] || categoryColors.general

  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4',
        priorityBorders[announcement.priority],
        'group'
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${category.bg} ${category.text}`}
          >
            <span>{category.icon}</span>
            {announcement.category.charAt(0).toUpperCase() +
              announcement.category.slice(1)}
          </span>
        </div>

        <h3 className="text-xl max-sm:text-sm font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
          {announcement.title}
        </h3>

        <p className="text-gray-600 max-sm:text-sm mb-4 line-clamp-3">
          {announcement.content}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 ">
            <User className="w-4 h-4" />
            <span className="text-sm">{announcement.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {formatDate(announcement.createdAt.toDate())}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
