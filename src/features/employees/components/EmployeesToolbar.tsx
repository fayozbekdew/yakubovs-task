import { Search } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Input, Select } from '../../../ui/controls'
import { DEPARTMENTS, DEPARTMENT_LABELS, type DepartmentFilter } from '../model'

interface EmployeesToolbarProps {
  search: string
  department: DepartmentFilter
  onSearchChange: (value: string) => void
  onDepartmentChange: (value: DepartmentFilter) => void
}

export function EmployeesToolbar({ search, department, onSearchChange, onDepartmentChange }: EmployeesToolbarProps) {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const focusOnSlash = (event: KeyboardEvent) => {
      const typing = event.target instanceof HTMLElement && event.target.closest('input, textarea, select, dialog')
      if (event.key !== '/' || typing) return
      event.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', focusOnSlash)
    return () => window.removeEventListener('keydown', focusOnSlash)
  }, [])

  return (
    <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:px-6">
      <label className="relative flex-1 sm:max-w-sm">
        <span className="sr-only">Qidirish</span>
        <Search size={15} className="text-ink-3 pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2" />
        <Input
          ref={searchRef}
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Ism, tabel raqami, telefon…"
          className="pr-8 pl-8"
        />
        <kbd className="border-line text-ink-3 pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded-[2px] border px-1.5 font-mono text-[10px] max-sm:hidden">
          /
        </kbd>
      </label>
      <Select
        aria-label="Bo'lim"
        value={department}
        onChange={(event) => onDepartmentChange(event.target.value as DepartmentFilter)}
        className="sm:w-48"
      >
        <option value="all">Barcha bo'limlar</option>
        {DEPARTMENTS.map((key) => (
          <option key={key} value={key}>
            {DEPARTMENT_LABELS[key]}
          </option>
        ))}
      </Select>
    </div>
  )
}
