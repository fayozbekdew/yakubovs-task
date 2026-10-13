import { BookOpen, CalendarCheck, LayoutGrid, Receipt, UsersRound, type LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import { EmployeesPage } from './features/employees/EmployeesPage'

const NAVIGATION: { label: string; icon: LucideIcon; current?: boolean }[] = [
  { label: 'Boshqaruv paneli', icon: LayoutGrid },
  { label: 'Guruhlar', icon: BookOpen },
  { label: 'Xodimlar', icon: UsersRound, current: true },
  { label: 'Davomat', icon: CalendarCheck },
  { label: "To'lovlar", icon: Receipt },
]

export function App() {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[220px_1fr]">
      <aside className="border-line bg-ink text-paper sticky top-0 z-20 flex items-center gap-6 border-b px-4 py-3 lg:h-dvh lg:flex-col lg:items-stretch lg:border-r lg:border-b-0 lg:px-3 lg:py-5">
        <div className="flex items-center gap-2.5 lg:px-2">
          <span className="bg-paper text-ink grid size-7 place-items-center rounded-[3px] font-mono text-xs font-semibold">
            YS
          </span>
          <div className="leading-tight">
            <p className="font-medium">Yakubovs School</p>
            <p className="text-paper/50 text-[11px] max-lg:hidden">Chilonzor filiali</p>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto max-lg:hidden lg:mt-8 lg:flex-col">
          {NAVIGATION.map(({ label, icon: Icon, current }) => (
            <a
              key={label}
              href={current ? '#' : undefined}
              aria-current={current ? 'page' : undefined}
              aria-disabled={!current}
              className={clsx(
                'flex items-center gap-2.5 rounded-[3px] px-2 py-1.5 whitespace-nowrap',
                current ? 'bg-paper/10 text-paper' : 'text-paper/40 cursor-default',
              )}
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </a>
          ))}
        </nav>
      </aside>
      <main className="pb-12">
        <EmployeesPage />
      </main>
    </div>
  )
}
