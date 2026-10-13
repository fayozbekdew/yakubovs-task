import clsx from 'clsx'
import { initials } from '../../../lib/format'
import type { Employee } from '../model'

const PALETTE = [
  'bg-accent-soft text-accent',
  'bg-[#fff0e7] text-[#994216]',
  'bg-[#dbe2ea] text-[#33506d]',
  'bg-[#eadbd8] text-[#7a3b30]',
  'bg-[#e2dfe9] text-[#4c4170]',
]

export function EmployeeAvatar({ employee, muted }: { employee: Employee; muted?: boolean }) {
  const tone = PALETTE[Number(employee.personnelNo.slice(3)) % PALETTE.length]
  return (
    <span
      aria-hidden
      className={clsx(
        'grid size-8 shrink-0 place-items-center rounded-[3px] text-[11px] font-semibold',
        muted ? 'bg-sunken text-ink-3' : tone,
      )}
    >
      {initials(employee.firstName, employee.lastName)}
    </span>
  )
}
