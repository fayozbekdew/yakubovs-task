import { describe, expect, it } from 'vitest'
import { formatTenure, initials } from './format'

describe('formatTenure', () => {
  const now = new Date(2026, 9, 13)

  it.each([
    ['2026-10-01', 'yangi'],
    ['2026-07-01', '3 oy'],
    ['2024-10-01', '2 yil'],
    ['2023-05-01', '3 yil 5 oy'],
  ])('%s → %s', (iso, expected) => {
    expect(formatTenure(iso, now)).toBe(expected)
  })
})

it('builds initials', () => {
  expect(initials('aziz', 'karimov')).toBe('AK')
})
