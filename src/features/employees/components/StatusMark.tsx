import clsx from 'clsx'
import { STATUS_LABELS, type EmployeeStatus } from '../model'
import { STATUS_TONES } from '../statusTones'

export function StatusMark({ status }: { status: EmployeeStatus }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 whitespace-nowrap',
        status === 'terminated' ? 'text-ink-3' : 'text-ink-2',
      )}
    >
      <span className={clsx('size-2 rounded-[1px]', STATUS_TONES[status])} />
      {STATUS_LABELS[status]}
    </span>
  )
}
