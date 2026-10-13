import clsx from 'clsx'
import { PenLine } from 'lucide-react'
import { formatDate, formatNumber, formatTenure } from '../../../lib/format'
import { DEPARTMENT_LABELS, type Employee } from '../model'
import { EmployeeAvatar } from './EmployeeAvatar'
import { StatusMark } from './StatusMark'

interface EmployeesTableProps {
  employees?: Employee[]
  skeletonRows: number
  onEdit: (employee: Employee) => void
}

const COLUMNS = [
  { label: 'Xodim' },
  { label: 'Tabel №' },
  { label: "Bo'lim / lavozim" },
  { label: 'Telefon', className: 'max-xl:hidden' },
  { label: 'Status' },
  { label: 'Qabul qilingan' },
  { label: "Oylik, so'm", className: 'text-right' },
  { label: '', className: 'w-10' },
]

function Bar({ className }: { className: string }) {
  return <span className={clsx('bg-sunken block h-3 animate-pulse rounded-sm', className)} />
}

export function EmployeesTable({ employees, skeletonRows, onEdit }: EmployeesTableProps) {
  if (!employees) {
    return (
      <ul aria-busy className="divide-line divide-y">
        {Array.from({ length: skeletonRows }, (_, index) => (
          <li key={index} className="flex items-center gap-4 px-4 py-3.5 sm:px-6">
            <span className="bg-sunken size-8 animate-pulse rounded-[3px]" />
            <div className="flex-1 space-y-2">
              <Bar className="w-40" />
              <Bar className="w-24" />
            </div>
            <Bar className="w-20 max-md:hidden" />
            <Bar className="w-16" />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <table className="w-full border-collapse max-md:hidden">
        <thead className="bg-surface sticky top-0 z-10">
          <tr className="border-line border-b">
            {COLUMNS.map(({ label, className }) => (
              <th
                key={label}
                className={clsx(
                  'text-ink-3 px-3 py-2.5 text-left text-[11px] font-medium tracking-wider whitespace-nowrap uppercase first:pl-6 last:pr-6',
                  className,
                )}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const inactive = employee.status === 'terminated'
            return (
              <tr
                key={employee.id}
                onClick={() => onEdit(employee)}
                className="group border-line hover:bg-paper/70 cursor-pointer border-b transition-colors last:border-b-0 [&>td]:px-3 [&>td]:py-2.5 [&>td:first-child]:pl-6 [&>td:last-child]:pr-6"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <EmployeeAvatar employee={employee} muted={inactive} />
                    <div className="min-w-0">
                      <p className={clsx('truncate font-medium', inactive && 'text-ink-3')}>
                        {employee.lastName} {employee.firstName}
                      </p>
                      <p className="text-ink-3 truncate text-xs">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="text-ink-2 font-mono text-xs">{employee.personnelNo}</td>
                <td>
                  <p>{employee.position}</p>
                  <p className="text-ink-3 text-xs">{DEPARTMENT_LABELS[employee.department]}</p>
                </td>
                <td className="text-ink-2 font-mono text-xs whitespace-nowrap max-xl:hidden">{employee.phone}</td>
                <td>
                  <StatusMark status={employee.status} />
                </td>
                <td className="whitespace-nowrap">
                  <p className="font-mono text-xs">{formatDate(employee.hireDate)}</p>
                  <p className="text-ink-3 text-xs">{formatTenure(employee.hireDate)}</p>
                </td>
                <td className="text-right font-mono whitespace-nowrap tabular-nums">{formatNumber(employee.salary)}</td>
                <td>
                  <button
                    aria-label={`${employee.firstName} ${employee.lastName} ma'lumotlarini tahrirlash`}
                    className="text-ink-3 hover:bg-sunken hover:text-ink grid size-7 place-items-center rounded-[3px] opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <PenLine size={15} />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <ul className="divide-line divide-y md:hidden">
        {employees.map((employee) => (
          <li key={employee.id}>
            <button
              onClick={() => onEdit(employee)}
              className="active:bg-paper flex w-full gap-3 px-4 py-3.5 text-left"
            >
              <EmployeeAvatar employee={employee} muted={employee.status === 'terminated'} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate font-medium">
                    {employee.lastName} {employee.firstName}
                  </p>
                  <span className="text-ink-3 font-mono text-[11px]">{employee.personnelNo}</span>
                </div>
                <p className="text-ink-3 truncate text-xs">
                  {employee.position} · {DEPARTMENT_LABELS[employee.department]}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <StatusMark status={employee.status} />
                  <span className="font-mono">{formatNumber(employee.salary)}</span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
