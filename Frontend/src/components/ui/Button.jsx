import { cn } from '@/lib/cn'

const buttonVariants = {
  primary:
    'bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105',
}

const Button = ({
  children,
  type,
  variant = 'primary',
  disabled = false,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'px-8 py-4 text-white text-lg font-semibold rounded-xl  cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl',
        buttonVariants[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
