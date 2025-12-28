import { cn } from '@/lib/cn'

const CardContainer = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg p-4 border-t-4 border-[#4361EE] shadow-sm hover:shadow-lg transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('flex items-start justify-between mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn('space-y-2 text-gray-600', className)} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(' pt-4 flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  )
}

const InfoRow = ({ leading, children, trailing }) => (
  <div className="flex items-center text-sm text-gray-600">
    {leading && <span className="mr-2 flex items-center">{leading}</span>}
    <span className="flex-1">{children}</span>
    {trailing && <span className="ml-2">{trailing}</span>}
  </div>
)

export { CardContainer, CardHeader, CardContent, InfoRow, CardFooter }
