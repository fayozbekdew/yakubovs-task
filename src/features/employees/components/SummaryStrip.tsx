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
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="border-line bg-surface min-w-0 rounded-xl border px-4 py-4 shadow-[0_1px_2px_rgb(20_30_20/0.03)] sm:px-5 sm:py-5"
        >
          <dt className="text-ink-3 text-xs">{metric.label}</dt>
          <dd className="mt-1.5 flex items-baseline gap-1.5">
            {metric.value === undefined && !isError ? (
              <span className="bg-sunken h-7 w-16 animate-pulse rounded-sm" />
            ) : (
              <span className="font-mono text-[26px] font-medium tracking-tight tabular-nums">
                {metric.value ?? '—'}
              </span>
            )}
            {metric.note && data && <span className="text-ink-3 text-xs">{metric.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}
