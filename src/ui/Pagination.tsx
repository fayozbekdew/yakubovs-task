import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatNumber } from '../lib/format'

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onChange: (page: number) => void
}

function pageWindow(current: number, last: number): (number | null)[] {
  const pages = [...new Set([1, current - 1, current, current + 1, last])]
    .filter((page) => page >= 1 && page <= last)
    .sort((a, b) => a - b)
  return pages.flatMap((page, index) => (index && page - pages[index - 1] > 1 ? [null, page] : [page]))
}

const cellClass = 'grid h-8 min-w-8 place-items-center rounded-[3px] px-2 font-mono text-xs'
const stepClass = clsx(cellClass, 'text-ink-2 hover:bg-sunken disabled:opacity-35 disabled:hover:bg-transparent')

export function Pagination({ page, pageSize, total, onChange }: PaginationProps) {
  const last = Math.max(1, Math.ceil(total / pageSize))
  const from = total ? (page - 1) * pageSize + 1 : 0
  const to = Math.min(page * pageSize, total)

  return (
    <nav aria-label="Sahifalar" className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <p className="text-ink-3">
        <span className="text-ink font-mono">
          {from}–{to}
        </span>{' '}
        / {formatNumber(total)} ta yozuv
      </p>
      <div className="flex items-center gap-0.5">
        <button
          className={stepClass}
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Oldingi sahifa"
        >
          <ChevronLeft size={16} />
        </button>
        {pageWindow(page, last).map((item, index) =>
          item === null ? (
            <span key={`gap-${index}`} className={clsx(cellClass, 'text-ink-3')}>
              …
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onChange(item)}
              aria-current={item === page ? 'page' : undefined}
              className={clsx(cellClass, item === page ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-sunken')}
            >
              {item}
            </button>
          ),
        )}
        <button
          className={stepClass}
          disabled={page === last}
          onClick={() => onChange(page + 1)}
          aria-label="Keyingi sahifa"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  )
}
