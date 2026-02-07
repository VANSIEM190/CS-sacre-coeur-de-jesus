import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@/lib/cn'
import { propsTypeUI } from '@/@types/PropTypeUI'
import { ChevronDown, ChevronUp } from 'lucide-react'

const Select = ({
  children,
  ...props
}: propsTypeUI &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>) => (
  <SelectPrimitive.Root data-slot="select" {...props}>
    {children}
  </SelectPrimitive.Root>
)
const SelectGroup = ({
  children,
  className,
  ...props
}: propsTypeUI &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>) => {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('SelectGroup', className)}
      {...props}
    >
      {children}
    </SelectPrimitive.Group>
  )
}

const SelectValue = ({ className = '', ...props }) => {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('SelectValue', className)}
      {...props}
    />
  )
}

const SelectIcon = ({ className = '', ...props }) => {
  return (
    <SelectPrimitive.Icon
      data-slot="select-icon"
      className={cn('SelectIcon', className)}
      {...props}
    />
  )
}

const SelectTrigger = ({
  children,
  className,
  ...props
}: propsTypeUI &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) => {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn('SelectTrigger', className)}
      {...props}
    >
      {children}
    </SelectPrimitive.Trigger>
  )
}

const SelectContent = ({
  className,
  children,
  ...props
}: propsTypeUI &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'relative z-50 min-w-32 overflow-hidden rounded-md border bg-white shadow-md',
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

const SelectItem = ({
  className,
  children,
  ...props
}: propsTypeUI &
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) => {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

const SelectSeparator = ({ className = '', ...props }) => {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

const SelectLabel = ({ className = '', ...props }) => {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('SelectLabel', className)}
      {...props}
    />
  )
}

const SelectScrollUpButton = ({ className = '', ...props }) => {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

const SelectScrollDownButton = ({ className = '', ...props }) => {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectItem,
  SelectIcon,
  SelectContent,
  SelectLabel,
}
