import type { EmployeeStatus } from './model'

export const STATUS_TONES: Record<EmployeeStatus, string> = {
  active: 'bg-[#2f7a4c]',
  probation: 'bg-[#c58a1b]',
  on_leave: 'bg-[#3e6596]',
  terminated: 'bg-ink-3/50',
}
