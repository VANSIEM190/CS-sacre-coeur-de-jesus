import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/cn'
import { propsTypeUI } from '@/@types/PropTypeUI'
import { ComponentPropsWithoutRef } from 'react'

const DropdownMenu = ({
  children,
}: propsTypeUI &
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root data-slot="dropdown-menu">
    {children}
  </DropdownMenuPrimitive.Root>
)

const DropdownTrigger = ({
  children,
}: propsTypeUI &
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>) => (
  <DropdownMenuPrimitive.Trigger data-slot="dopdown-trigger" asChild>
    {children}
  </DropdownMenuPrimitive.Trigger>
)

const DropdownContent = ({
  children,
  className,
}: propsTypeUI &
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      data-slot="dropdown-content"
      className={cn('DropdownMenuContent', className)}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
)

const DropdownItem = ({
  children,
  className,
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>) => (
  <DropdownMenuPrimitive.Item
    className={cn('DropdownMenuItem', className)}
    data-slot="dropdown-item"
  >
    {children}
  </DropdownMenuPrimitive.Item>
)

export { DropdownMenu, DropdownTrigger, DropdownContent, DropdownItem }
