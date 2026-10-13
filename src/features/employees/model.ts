import { z } from 'zod'

export const STATUSES = ['active', 'probation', 'on_leave', 'terminated'] as const
export const DEPARTMENTS = ['academic', 'admissions', 'finance', 'hr', 'it', 'operations'] as const

export type EmployeeStatus = (typeof STATUSES)[number]
export type Department = (typeof DEPARTMENTS)[number]
export type StatusFilter = EmployeeStatus | 'all'
export type DepartmentFilter = Department | 'all'

export const STATUS_LABELS: Record<EmployeeStatus, string> = {
  active: 'Faol',
  probation: 'Sinov muddati',
  on_leave: "Ta'tilda",
  terminated: "Bo'shagan",
}

export const DEPARTMENT_LABELS: Record<Department, string> = {
  academic: "O'quv bo'limi",
  admissions: 'Qabul',
  finance: 'Moliya',
  hr: 'Kadrlar',
  it: 'IT',
  operations: "Xo'jalik",
}

const PHONE_PATTERN = /^\+998 ?\d{2} ?\d{3} ?\d{2} ?\d{2}$/

export const employeeSchema = z.object({
  firstName: z.string().trim().min(2, 'Kamida 2 ta belgi').max(40, 'Juda uzun'),
  lastName: z.string().trim().min(2, 'Kamida 2 ta belgi').max(40, 'Juda uzun'),
  email: z.email("Email formati noto'g'ri"),
  phone: z.string().trim().regex(PHONE_PATTERN, 'Format: +998 90 123 45 67'),
  department: z.enum(DEPARTMENTS, { error: "Bo'limni tanlang" }),
  position: z.string().trim().min(2, 'Lavozimni kiriting'),
  status: z.enum(STATUSES),
  hireDate: z.iso
    .date('Sanani kiriting')
    .refine((value) => new Date(value) <= new Date(), "Sana kelajakda bo'lishi mumkin emas"),
  salary: z
    .number({ error: 'Summani kiriting' })
    .int('Butun son kiriting')
    .min(1_000_000, 'Eng kam oylik — 1 000 000')
    .max(200_000_000, 'Juda katta summa'),
})

export type EmployeeInput = z.infer<typeof employeeSchema>

export interface Employee extends EmployeeInput {
  id: string
  personnelNo: string
}

export interface EmployeeQuery {
  search: string
  status: StatusFilter
  department: DepartmentFilter
  page: number
  pageSize: number
}

export interface EmployeePage {
  items: Employee[]
  total: number
  counts: Record<StatusFilter, number>
}

export interface EmployeeSummary {
  headcount: number
  active: number
  away: number
  payroll: number
}

export interface EmployeesApi {
  list(query: EmployeeQuery): Promise<EmployeePage>
  summary(): Promise<EmployeeSummary>
  create(input: EmployeeInput): Promise<Employee>
  update(id: string, input: EmployeeInput): Promise<Employee>
}

export class FieldConflictError extends Error {
  readonly field: keyof EmployeeInput

  constructor(field: keyof EmployeeInput, message: string) {
    super(message)
    this.field = field
  }
}
