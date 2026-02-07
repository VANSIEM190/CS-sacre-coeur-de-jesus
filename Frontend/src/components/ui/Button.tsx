import { cn } from '@/lib/cn'
import React from 'react'

type ButtonVariantPropType = {
  primary: string
  ghost: string
}

type propsTypeButton = {
  children: React.ReactNode
  className?: string
  variant: keyof ButtonVariantPropType
  disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const buttonVariants = {
  primary:
    'bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105',
  ghost: 'border border-red-200 text-red-600 bg-red-50',
}

const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  className,
  ...props
}: propsTypeButton) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        'px-8 py-4 text-white text-lg font-semibold rounded-xl  cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl',
        buttonVariants[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
