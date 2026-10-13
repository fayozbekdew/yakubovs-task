import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { Pagination } from './Pagination'

it('renders a page window with gaps and navigates', async () => {
  const onChange = vi.fn()
  render(<Pagination page={5} pageSize={10} total={100} onChange={onChange} />)

  const pages = screen.getAllByRole('button').map((button) => button.textContent)
  expect(pages).toEqual(['', '1', '4', '5', '6', '10', ''])
  expect(screen.getAllByText('…')).toHaveLength(2)
  expect(screen.getByRole('button', { name: '5' })).toHaveAttribute('aria-current', 'page')

  await userEvent.click(screen.getByLabelText('Keyingi sahifa'))
  expect(onChange).toHaveBeenCalledWith(6)
})

it('disables navigation on a single page', () => {
  render(<Pagination page={1} pageSize={10} total={3} onChange={vi.fn()} />)
  expect(screen.getByLabelText('Oldingi sahifa')).toBeDisabled()
  expect(screen.getByLabelText('Keyingi sahifa')).toBeDisabled()
})
