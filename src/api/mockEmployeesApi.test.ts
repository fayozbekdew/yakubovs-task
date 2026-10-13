import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FieldConflictError, employeeSchema } from '../features/employees/model'
import { mockEmployeesApi as api } from './mockEmployeesApi'

const query = { search: '', status: 'all', department: 'all', page: 1, pageSize: 10 } as const

describe('mockEmployeesApi', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true, advanceTimeDelta: 100 })
  })

  it('paginates and counts by status', async () => {
    const page = await api.list(query)
    expect(page.items).toHaveLength(10)
    expect(page.total).toBe(page.counts.all)
    expect(page.counts.active + page.counts.probation + page.counts.on_leave + page.counts.terminated).toBe(page.total)
  })

  it('filters by status', async () => {
    const page = await api.list({ ...query, status: 'on_leave', pageSize: 100 })
    expect(page.items.every((item) => item.status === 'on_leave')).toBe(true)
  })

  it('rejects a duplicate email as a field error', async () => {
    const [existing] = (await api.list(query)).items
    await expect(api.create(employeeSchema.parse(existing))).rejects.toBeInstanceOf(FieldConflictError)
  })
})
