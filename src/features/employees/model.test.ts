import { describe, expect, it } from 'vitest'
import { employeeSchema, type EmployeeInput } from './model'

const valid: EmployeeInput = {
  firstName: 'Aziz',
  lastName: 'Karimov',
  email: 'aziz@edu.uz',
  phone: '+998 90 123 45 67',
  department: 'it',
  position: 'Frontend dasturchi',
  status: 'active',
  hireDate: '2024-01-15',
  salary: 9_000_000,
}

const errorsFor = (patch: Partial<EmployeeInput>) =>
  employeeSchema.safeParse({ ...valid, ...patch }).error?.issues.map((issue) => issue.path[0])

describe('employeeSchema', () => {
  it('accepts a valid employee', () => {
    expect(employeeSchema.safeParse(valid).success).toBe(true)
  })

  it.each<[keyof EmployeeInput, Partial<EmployeeInput>]>([
    ['email', { email: 'nope' }],
    ['phone', { phone: '90 123 45 67' }],
    ['salary', { salary: 500_000 }],
    ['hireDate', { hireDate: '2999-01-01' }],
    ['firstName', { firstName: 'A' }],
  ])('rejects invalid %s', (field, patch) => {
    expect(errorsFor(patch)).toEqual([field])
  })
})
