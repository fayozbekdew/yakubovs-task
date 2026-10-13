import clsx from 'clsx'
import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

export function Field({ label, htmlFor, error, hint, className, children }: FieldProps) {
  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <label htmlFor={htmlFor} className="text-ink-2 text-xs font-medium">
        {label}
      </label>
      {children}
      <p className={clsx('min-h-4 text-xs', error ? 'text-danger' : 'text-ink-3')}>{error ?? hint}</p>
    </div>
  )
}
