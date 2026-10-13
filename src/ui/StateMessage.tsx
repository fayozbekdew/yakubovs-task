import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface StateMessageProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export function StateMessage({ icon: Icon, title, description, action }: StateMessageProps) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="border-line-strong text-ink-3 mb-4 grid size-11 place-items-center rounded-full border border-dashed">
        <Icon size={20} strokeWidth={1.6} />
      </div>
      <p className="font-medium">{title}</p>
      <p className="text-ink-3 mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
