import { formatNumber } from '../../../lib/format'
import { useEmployeeSummary } from '../queries'

export function SummaryStrip() {
  const { data, isError } = useEmployeeSummary()

  const metrics = [
    { label: 'Shtatdagi xodimlar', value: data && formatNumber(data.headcount) },
    {
      label: 'Faol ishlamoqda',
      value: data && formatNumber(data.active),
      note: data?.headcount ? `${Math.round((data.active / data.headcount) * 100)}%` : undefined,
    },
    { label: "Ta'tilda", value: data && formatNumber(data.away) },
    {
      label: 'Oylik ish haqi fondi',
      value: data && formatNumber(Math.round(data.payroll / 1_000_000)),
      note: "mln so'm",
    },
  ]

  return (
    <dl className="border-line grid grid-cols-2 border-y lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="border-line px-4 py-4 not-first:border-l max-lg:nth-3:border-l-0 max-lg:nth-[n+3]:border-t sm:px-6"
        >
          <dt className="text-ink-3 text-xs">{metric.label}</dt>
          <dd className="mt-1.5 flex items-baseline gap-1.5">
            {metric.value === undefined && !isError ? (
              <span className="bg-sunken h-7 w-16 animate-pulse rounded-sm" />
            ) : (
              <span className="font-mono text-2xl tracking-tight">{metric.value ?? '—'}</span>
            )}
            {metric.note && data && <span className="text-ink-3 text-xs">{metric.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}
