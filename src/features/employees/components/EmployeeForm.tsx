import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { useForm, type FieldPath, type RegisterOptions } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../../../ui/Button'
import { Field } from '../../../ui/Field'
import { Input, Select } from '../../../ui/controls'
import {
  DEPARTMENTS,
  DEPARTMENT_LABELS,
  FieldConflictError,
  STATUSES,
  STATUS_LABELS,
  employeeSchema,
  type Employee,
  type EmployeeInput,
} from '../model'
import { useSaveEmployee } from '../queries'

interface EmployeeFormProps {
  employee?: Employee
  onDone: () => void
}

const EMPTY: Partial<EmployeeInput> = {
  status: 'probation',
  phone: '+998 ',
  hireDate: new Date().toISOString().slice(0, 10),
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-line grid grid-cols-1 gap-x-4 gap-y-1 border-b px-6 py-5 sm:grid-cols-2">
      <legend className="text-ink-3 float-left mb-3 w-full font-mono text-[11px] tracking-wider uppercase sm:col-span-2">
        {title}
      </legend>
      {children}
    </fieldset>
  )
}

export function EmployeeForm({ employee, onDone }: EmployeeFormProps) {
  const save = useSaveEmployee()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<EmployeeInput>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee ?? EMPTY,
    mode: 'onTouched',
  })

  const bind = (name: FieldPath<EmployeeInput>, options?: RegisterOptions<EmployeeInput>) => ({
    id: name,
    'aria-invalid': Boolean(errors[name]),
    ...register(name, options),
  })

  const submit = handleSubmit(async (input) => {
    try {
      const saved = await save.mutateAsync({ id: employee?.id, input })
      toast.success(employee ? "O'zgarishlar saqlandi" : `${saved.personnelNo} raqami bilan xodim qo'shildi`)
      onDone()
    } catch (error) {
      if (error instanceof FieldConflictError) setError(error.field, { message: error.message }, { shouldFocus: true })
    }
  })

  const failure = save.error && !(save.error instanceof FieldConflictError) ? save.error.message : null

  return (
    <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto">
        <Section title="Shaxsiy ma'lumotlar">
          <Field label="Familiya" htmlFor="lastName" error={errors.lastName?.message}>
            <Input {...bind('lastName')} autoComplete="family-name" />
          </Field>
          <Field label="Ism" htmlFor="firstName" error={errors.firstName?.message}>
            <Input {...bind('firstName')} autoComplete="given-name" />
          </Field>
          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <Input {...bind('email')} type="email" autoComplete="email" />
          </Field>
          <Field label="Telefon" htmlFor="phone" error={errors.phone?.message}>
            <Input {...bind('phone')} type="tel" inputMode="tel" className="font-mono" />
          </Field>
        </Section>

        <Section title="Ish joyi">
          <Field label="Bo'lim" htmlFor="department" error={errors.department?.message}>
            <Select {...bind('department')}>
              <option value="">Tanlang</option>
              {DEPARTMENTS.map((key) => (
                <option key={key} value={key}>
                  {DEPARTMENT_LABELS[key]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Lavozim" htmlFor="position" error={errors.position?.message}>
            <Input {...bind('position')} />
          </Field>
        </Section>

        <Section title="Shartnoma">
          <Field label="Status" htmlFor="status" error={errors.status?.message}>
            <Select {...bind('status')}>
              {STATUSES.map((key) => (
                <option key={key} value={key}>
                  {STATUS_LABELS[key]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Ishga qabul sanasi" htmlFor="hireDate" error={errors.hireDate?.message}>
            <Input {...bind('hireDate')} type="date" className="font-mono" />
          </Field>
          <Field
            label="Oylik maosh, so'm"
            htmlFor="salary"
            error={errors.salary?.message}
            hint="Soliqlar ushlanmagan summa"
            className="sm:col-span-2"
          >
            <Input
              {...bind('salary', { valueAsNumber: true })}
              type="number"
              inputMode="numeric"
              step={100_000}
              className="font-mono"
            />
          </Field>
        </Section>
      </div>

      <footer className="border-line bg-paper flex items-center justify-between gap-3 border-t px-6 py-3">
        <p role="alert" className="text-danger min-w-0 text-xs">
          {failure}
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onDone}>
            Bekor qilish
          </Button>
          <Button type="submit" variant="primary" disabled={save.isPending || (employee && !isDirty)}>
            {save.isPending && <LoaderCircle size={14} className="animate-spin" />}
            {employee ? 'Saqlash' : "Qo'shish"}
          </Button>
        </div>
      </footer>
    </form>
  )
}
