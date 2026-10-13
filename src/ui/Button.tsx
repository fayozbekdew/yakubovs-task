import clsx from 'clsx'
import type { ComponentProps } from 'react'

const VARIANTS = {
  primary: 'bg-accent text-white hover:bg-accent-hover disabled:bg-accent/60',
  secondary: 'border border-line-strong bg-surface text-ink hover:bg-sunken',
  ghost: 'text-ink-2 hover:bg-sunken hover:text-ink',
}

interface ButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof VARIANTS
}

export function Button({ variant = 'secondary', className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-[3px] px-3 font-medium transition-colors',
        'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed',
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  )
}
