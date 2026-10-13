import {
  FieldConflictError,
  STATUSES,
  type Employee,
  type EmployeeInput,
  type EmployeeQuery,
  type EmployeesApi,
  type StatusFilter,
} from '../features/employees/model'
import { formatPersonnelNo, seedEmployees } from './seed'

const STORAGE_KEY = 'erp.employees.v1'
const FAILURE_RATE = Number(import.meta.env.VITE_MOCK_FAILURE_RATE ?? 0)

function load(): Employee[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
  return seedEmployees()
}

let employees = load()

function commit(next: Employee[]) {
  employees = next
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

async function respond<T>(handler: () => T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, 250 + Math.random() * 450))
  if (Math.random() < FAILURE_RATE) throw new Error('Server javob bermadi. Birozdan so‘ng qayta urinib ko‘ring.')
  return handler()
}

function matches(employee: Employee, search: string) {
  if (!search) return true
  const haystack = [
    employee.firstName,
    employee.lastName,
    employee.email,
    employee.phone.replace(/\s/g, ''),
    employee.personnelNo,
    employee.position,
  ]
    .join(' ')
    .toLowerCase()
  return search
    .toLowerCase()
    .split(/\s+/)
    .every((term) => haystack.includes(term))
}

function assertUniqueEmail(email: string, exceptId?: string) {
  const taken = employees.some((item) => item.id !== exceptId && item.email.toLowerCase() === email.toLowerCase())
  if (taken) throw new FieldConflictError('email', 'Bu email boshqa xodimga biriktirilgan')
}

function nextPersonnelNo() {
  const max = Math.max(0, ...employees.map((item) => Number(item.personnelNo.slice(3))))
  return formatPersonnelNo(max + 1)
}

export const mockEmployeesApi: EmployeesApi = {
  list: ({ search, status, department, page, pageSize }: EmployeeQuery) =>
    respond(() => {
      const scoped = employees.filter(
        (item) => (department === 'all' || item.department === department) && matches(item, search.trim()),
      )
      const counts = Object.fromEntries([
        ['all', scoped.length],
        ...STATUSES.map((key) => [key, scoped.filter((item) => item.status === key).length]),
      ]) as Record<StatusFilter, number>
      const filtered = status === 'all' ? scoped : scoped.filter((item) => item.status === status)
      const sorted = filtered.toSorted((a, b) => b.personnelNo.localeCompare(a.personnelNo))

      return {
        items: sorted.slice((page - 1) * pageSize, page * pageSize),
        total: filtered.length,
        counts,
      }
    }),

  summary: () =>
    respond(() => {
      const staff = employees.filter((item) => item.status !== 'terminated')
      return {
        headcount: staff.length,
        active: staff.filter((item) => item.status === 'active').length,
        away: staff.filter((item) => item.status === 'on_leave').length,
        payroll: staff.reduce((sum, item) => sum + item.salary, 0),
      }
    }),

  create: (input: EmployeeInput) =>
    respond(() => {
      assertUniqueEmail(input.email)
      const employee = { ...input, id: crypto.randomUUID(), personnelNo: nextPersonnelNo() }
      commit([...employees, employee])
      return employee
    }),

  update: (id: string, input: EmployeeInput) =>
    respond(() => {
      const current = employees.find((item) => item.id === id)
      if (!current) throw new Error('Xodim topilmadi')
      assertUniqueEmail(input.email, id)
      const employee = { ...current, ...input }
      commit(employees.map((item) => (item.id === id ? employee : item)))
      return employee
    }),
}
