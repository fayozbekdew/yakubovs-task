import { CloudOff, Plus, SearchX, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { useDebouncedValue } from '../../lib/useDebouncedValue'
import { Button } from '../../ui/Button'
import { Pagination } from '../../ui/Pagination'
import { Sheet } from '../../ui/Sheet'
import { StateMessage } from '../../ui/StateMessage'
import { EmployeeForm } from './components/EmployeeForm'
import { EmployeesTable } from './components/EmployeesTable'
import { EmployeesToolbar } from './components/EmployeesToolbar'
import { StatusTabs } from './components/StatusTabs'
import { SummaryStrip } from './components/SummaryStrip'
import type { DepartmentFilter, Employee, StatusFilter } from './model'
import { useEmployees } from './queries'

const PAGE_SIZE = 12

interface Filters {
  search: string
  status: StatusFilter
  department: DepartmentFilter
}

const INITIAL_FILTERS: Filters = { search: '', status: 'all', department: 'all' }

export function EmployeesPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [page, setPage] = useState(1)
  const [sheet, setSheet] = useState<{ employee?: Employee } | null>(null)
  const search = useDebouncedValue(filters.search)

  const { data, error, isFetching, isPlaceholderData, refetch } = useEmployees({
    ...filters,
    search,
    page,
    pageSize: PAGE_SIZE,
  })

  const applyFilters = (patch: Partial<Filters>) => {
    setFilters((current) => ({ ...current, ...patch }))
    setPage(1)
  }

  const hasFilters = filters.search !== '' || filters.status !== 'all' || filters.department !== 'all'
  const createEmployee = () => setSheet({})
  const closeSheet = () => setSheet(null)
  const editing = sheet?.employee

  const renderBody = () => {
    if (error && !data)
      return (
        <StateMessage
          icon={CloudOff}
          title="Ma'lumotlarni yuklab bo'lmadi"
          description={error.message}
          action={<Button onClick={() => refetch()}>Qayta urinish</Button>}
        />
      )
    if (data?.items.length === 0)
      return hasFilters ? (
        <StateMessage
          icon={SearchX}
          title="Hech narsa topilmadi"
          description="Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang."
          action={<Button onClick={() => applyFilters(INITIAL_FILTERS)}>Filtrlarni tozalash</Button>}
        />
      ) : (
        <StateMessage
          icon={UsersRound}
          title="Hali xodimlar yo'q"
          description="Birinchi xodimni qo'shing — u shu ro'yxatda paydo bo'ladi."
          action={
            <Button variant="primary" onClick={createEmployee}>
              Xodim qo'shish
            </Button>
          }
        />
      )
    return (
      <div className={isPlaceholderData ? 'opacity-60 transition-opacity' : undefined}>
        <EmployeesTable
          employees={data?.items}
          skeletonRows={PAGE_SIZE}
          onEdit={(employee) => setSheet({ employee })}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      <header className="flex flex-wrap items-end justify-between gap-4 px-4 pt-6 pb-5 sm:px-6 lg:pt-8">
        <div>
          <p className="text-ink-3 font-mono text-[11px] tracking-wider uppercase">Kadrlar / Ro'yxat</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Xodimlar</h1>
        </div>
        <Button variant="primary" onClick={createEmployee}>
          <Plus size={16} />
          Xodim qo'shish
        </Button>
      </header>

      <SummaryStrip />

      <section className="border-line bg-surface mt-6 border-y sm:mx-6 sm:border-x">
        <div className="border-line border-b">
          <StatusTabs value={filters.status} counts={data?.counts} onChange={(status) => applyFilters({ status })} />
        </div>
        <EmployeesToolbar
          search={filters.search}
          department={filters.department}
          onSearchChange={(value) => applyFilters({ search: value })}
          onDepartmentChange={(department) => applyFilters({ department })}
        />
        <div className="border-line relative h-0.5 overflow-hidden border-t">
          {isFetching && <span className="animate-progress bg-accent absolute inset-y-0 w-1/3" />}
        </div>
        {renderBody()}
        {data && data.total > 0 && (
          <div className="border-line border-t">
            <Pagination page={page} pageSize={PAGE_SIZE} total={data.total} onChange={setPage} />
          </div>
        )}
      </section>

      <Sheet
        open={sheet !== null}
        onClose={closeSheet}
        eyebrow={editing ? `Tabel ${editing.personnelNo}` : 'Yangi yozuv'}
        title={editing ? `${editing.lastName} ${editing.firstName}` : "Xodim qo'shish"}
      >
        <EmployeeForm employee={editing} onDone={closeSheet} />
      </Sheet>
    </div>
  )
}
