const numberFormat = new Intl.NumberFormat('ru-RU')
const dateFormat = new Intl.DateTimeFormat('ru-RU')

export const formatNumber = (value: number) => numberFormat.format(value)

export const formatDate = (iso: string) => dateFormat.format(new Date(iso))

export function formatTenure(iso: string, now = new Date()) {
  const start = new Date(iso)
  const months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth()
  if (months < 1) return 'yangi'
  const years = Math.floor(months / 12)
  const rest = months % 12
  return [years && `${years} yil`, rest && `${rest} oy`].filter(Boolean).join(' ')
}

export const initials = (...parts: string[]) =>
  parts
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
