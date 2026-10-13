import clsx from 'clsx'
import { STATUSES, STATUS_LABELS, type StatusFilter } from '../model'
import { STATUS_TONES } from '../statusTones'

interface StatusTabsProps {
  value: StatusFilter
  counts?: Record<StatusFilter, number>
  onChange: (status: StatusFilter) => void
}

const TABS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'Barchasi' },
  ...STATUSES.map((key) => ({ key, label: STATUS_LABELS[key] })),
]

export function StatusTabs({ value, counts, onChange }: StatusTabsProps) {
  return (
    <div role="tablist" aria-label="Status bo'yicha filtr" className="-mb-px flex gap-5 overflow-x-auto px-4 sm:px-6">
      {TABS.map(({ key, label }) => {
        const selected = key === value
        return (
          <button
            key={key}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(key)}
            className={clsx(
              'flex shrink-0 items-center gap-2 border-b-2 py-3 whitespace-nowrap transition-colors',
              selected ? 'border-ink text-ink font-medium' : 'text-ink-3 hover:text-ink-2 border-transparent',
            )}
          >
            {key !== 'all' && <span className={clsx('size-1.5 rounded-[1px]', STATUS_TONES[key])} />}
            {label}
            <span className={clsx('font-mono text-[11px]', selected ? 'text-ink-2' : 'text-ink-3')}>
              {counts?.[key] ?? '—'}
            </span>
          </button>
        )
      })}
    </div>
  )
}
