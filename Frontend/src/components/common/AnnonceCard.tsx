import { cn } from '@/lib/cn'
import { Calendar, User } from 'lucide-react'
import formatDate from '@/utils/FormatDate'
import { CardContainer, CardContent, CardHeader, InfoRow } from '../ui'

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

const AnnouncementCard = ({ announcement, setSelectedAnnouncement }) => {
  const category =
    categoryColors[announcement.category] || categoryColors.general

  return (
    <CardContainer
      className={cn(
        'bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-t-0 overflow-hidden border-l-4',
        priorityBorders[announcement.priority]
      )}
      onClick={() => {
        if (announcement.content.length < 45) return
        setSelectedAnnouncement(announcement.content)
      }}
    >
      <CardContent className="p-6">
        <CardHeader>
          <span
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
              category.bg,
              category.text
            )}
          >
            <span>{category.icon}</span>
            {announcement.category}
          </span>
        </CardHeader>

        <h3 className="text-xl max-sm:text-sm font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
          {announcement.title}
        </h3>

        <p className="text-gray-600 max-sm:text-sm mb-4 line-clamp-3">
          {announcement.content}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <InfoRow leading={<User className="w-4 h-4" />}>
            {announcement.author}
          </InfoRow>

          <InfoRow leading={<Calendar className="w-4 h-4" />}>
            {formatDate(announcement.createdAt.toDate())}
          </InfoRow>
        </div>
      </CardContent>
    </CardContainer>
  )
}

export default AnnouncementCard
