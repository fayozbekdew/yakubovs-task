import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mockEmployeesApi as api } from '../../api/mockEmployeesApi'
import type { EmployeeInput, EmployeeQuery } from './model'

const employeeKeys = {
  all: ['employees'] as const,
  list: (query: EmployeeQuery) => [...employeeKeys.all, 'list', query] as const,
  summary: () => [...employeeKeys.all, 'summary'] as const,
}

export const useEmployees = (query: EmployeeQuery) =>
  useQuery({
    queryKey: employeeKeys.list(query),
    queryFn: () => api.list(query),
    placeholderData: keepPreviousData,
  })

export const useEmployeeSummary = () =>
  useQuery({
    queryKey: employeeKeys.summary(),
    queryFn: api.summary,
  })

export function useSaveEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id?: string; input: EmployeeInput }) =>
      id ? api.update(id, input) : api.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: employeeKeys.all }),
  })
}
