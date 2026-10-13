import clsx from 'clsx'
import type { ComponentProps } from 'react'

const controlClass = (invalid?: boolean) =>
  clsx(
    'h-9 w-full rounded-[3px] border bg-surface px-2.5 text-ink outline-none transition-colors placeholder:text-ink-3',
    'focus:border-accent focus:ring-2 focus:ring-accent/15',
    invalid ? 'border-danger' : 'border-line-strong hover:border-ink-3',
  )

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={clsx(controlClass(props['aria-invalid'] === true), className)} {...props} />
}

export function Select({ className, ...props }: ComponentProps<'select'>) {
  return <select className={clsx(controlClass(props['aria-invalid'] === true), 'pr-7', className)} {...props} />
}
