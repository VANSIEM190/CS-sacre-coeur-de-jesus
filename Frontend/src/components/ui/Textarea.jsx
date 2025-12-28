import { cn } from '@/lib/cn'

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300',
        className
      )}
      {...props}
    ></textarea>
  )
}

export { Textarea }
