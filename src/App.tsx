import {
  Bell,
  BookOpen,
  CalendarCheck,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Receipt,
  Settings2,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
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
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="bg-ink text-paper flex flex-col lg:sticky lg:top-0 lg:h-dvh">
        <div className="flex items-center justify-between px-5 py-5 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="bg-accent grid size-9 place-items-center rounded-xl text-sm font-bold tracking-tight text-white">
              YS
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Yakubovs School</p>
              <p className="text-paper/50 mt-1 text-[11px]">Boshqaruv tizimi</p>
            </div>
          </div>
          <button
            aria-label="Filialni tanlash"
            className="text-paper/50 grid size-8 place-items-center rounded-lg hover:bg-white/10 hover:text-white lg:hidden"
          >
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="mx-4 mb-3 hidden rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 lg:block">
          <p className="text-paper/45 text-[10px] font-medium tracking-[0.12em] uppercase">Faol filial</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs font-medium">Chilonzor filiali</p>
            <ChevronDown size={14} className="text-paper/50" />
          </div>
        </div>

        <nav
          aria-label="Asosiy menyu"
          className="flex gap-1 overflow-x-auto px-3 pb-3 lg:mt-3 lg:flex-col lg:overflow-visible lg:px-4"
        >
          <p className="text-paper/35 hidden px-3 pb-2 text-[10px] font-semibold tracking-[0.14em] uppercase lg:block">
            Asosiy menyu
          </p>
          {NAVIGATION.map(({ label, icon: Icon, current }) => (
            <a
              key={label}
              href={current ? '#' : undefined}
              aria-current={current ? 'page' : undefined}
              aria-disabled={!current}
              className={clsx(
                'flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors',
                current ? 'bg-white/10 text-white shadow-sm' : 'text-paper/55 hover:text-paper hover:bg-white/[0.06]',
              )}
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
              {current && <span className="bg-accent ml-auto hidden size-1.5 rounded-full lg:block" />}
            </a>
          ))}
        </nav>

        <div className="mt-auto hidden px-4 pb-4 lg:block">
          <button className="text-paper/55 hover:text-paper flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs transition hover:bg-white/[0.06]">
            <Settings2 size={17} /> Sozlamalar
          </button>
          <div className="mt-3 flex items-center gap-3 border-t border-white/10 px-2 pt-4">
            <span className="text-accent grid size-9 place-items-center rounded-full bg-[#d9e6d8] text-xs font-semibold">
              AK
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">Aziza Karimova</p>
              <p className="text-paper/45 mt-0.5 text-[11px]">Administrator</p>
            </div>
            <LogOut size={15} className="text-paper/40" />
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="border-line bg-surface sticky top-0 z-20 flex h-14 items-center justify-between border-b px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink-3">Yakubovs School</span>
            <span className="text-line-strong">/</span>
            <span className="font-medium">Xodimlar</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-ink-3 hidden text-[11px] sm:inline">
              {new Intl.DateTimeFormat('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}
            </span>
            <button
              aria-label="Bildirishnomalar"
              className="text-ink-2 hover:bg-sunken relative grid size-9 place-items-center rounded-lg transition"
            >
              <Bell size={17} />
              <span className="bg-danger ring-surface absolute top-2 right-2 size-1.5 rounded-full ring-2" />
            </button>
            <span className="text-accent grid size-8 place-items-center rounded-full bg-[#d9e6d8] text-[11px] font-semibold lg:hidden">
              AK
            </span>
          </div>
        </div>
        <main className="pb-12">
          <EmployeesPage />
        </main>
      </div>
    </div>
  )
}
