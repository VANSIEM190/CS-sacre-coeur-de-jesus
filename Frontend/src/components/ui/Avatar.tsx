import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/lib/cn'
import { propsTypeUI } from '@/@types/PropTypeUI'

const Avatar = ({ className, children }: propsTypeUI) => (
  <AvatarPrimitive.Root
    className={cn('AvatarRoot', className)}
    data-slot="avatar"
  >
    {children}
  </AvatarPrimitive.Root>
)

const AvatarImage = ({
  className,
  ...props
}: propsTypeUI &
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) => (
  <AvatarPrimitive.Image
    data-slot="avatar-image"
    className={cn(
      'AvatarImage',
      'w-20 h-20 rounded-full object-cover border-2 border-slate-200',
      className
    )}
    {...props}
  />
)

const AvatarFallback = ({ className, children }: propsTypeUI) => (
  <AvatarPrimitive.Fallback className={cn('AvatarFallback', className)}>
    {children}
  </AvatarPrimitive.Fallback>
)

export { Avatar, AvatarImage, AvatarFallback }
