import type { Department, Employee, EmployeeStatus } from '../features/employees/model'

const MALE_NAMES = [
  'Aziz',
  'Bekzod',
  'Javohir',
  'Sardor',
  'Otabek',
  'Jasur',
  'Rustam',
  'Shoxrux',
  'Dilshod',
  'Anvar',
  'Farrux',
  'Ulugbek',
]
const FEMALE_NAMES = [
  'Madina',
  'Nilufar',
  'Gulnoza',
  'Dilnoza',
  'Malika',
  'Shahnoza',
  'Zarina',
  'Kamola',
  'Sevara',
  'Mohira',
  'Nodira',
  'Feruza',
]
const SURNAME_ROOTS = [
  'Karimov',
  'Rahimov',
  'Tursunov',
  'Yusupov',
  'Abdullayev',
  'Saidov',
  'Ismoilov',
  'Nazarov',
  'Qodirov',
  'Hasanov',
  'Ergashev',
  'Mirzayev',
]

const POSITIONS: Record<Department, string[]> = {
  academic: ['Ingliz tili o‘qituvchisi', 'Matematika o‘qituvchisi', 'Metodist', 'IELTS mentori', 'Kurs koordinatori'],
  admissions: ['Qabul menejeri', 'Call-markaz operatori', 'Sotuv menejeri'],
  finance: ['Bosh hisobchi', 'Hisobchi', 'Kassir'],
  hr: ['HR menejer', 'Rekruter'],
  it: ['Frontend dasturchi', 'Backend dasturchi', 'Tizim administratori'],
  operations: ['Filial menejeri', 'Administrator', 'Ta’minot mutaxassisi'],
}

const DEPARTMENT_WEIGHTS: Department[] = [
  'academic',
  'academic',
  'academic',
  'academic',
  'admissions',
  'admissions',
  'finance',
  'hr',
  'it',
  'operations',
  'operations',
]
const STATUS_WEIGHTS: EmployeeStatus[] = [
  'active',
  'active',
  'active',
  'active',
  'active',
  'active',
  'probation',
  'on_leave',
  'terminated',
]

function createRandom(seed: number) {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function formatPersonnelNo(sequence: number) {
  return `XD-${String(sequence).padStart(4, '0')}`
}

export function seedEmployees(count = 68): Employee[] {
  const random = createRandom(20240901)
  const pick = <T>(list: readonly T[]) => list[Math.floor(random() * list.length)]
  const digits = (length: number) => Array.from({ length }, () => Math.floor(random() * 10)).join('')

  return Array.from({ length: count }, (_, index) => {
    const isFemale = random() > 0.5
    const firstName = pick(isFemale ? FEMALE_NAMES : MALE_NAMES)
    const lastName = pick(SURNAME_ROOTS) + (isFemale ? 'a' : '')
    const department = pick(DEPARTMENT_WEIGHTS)
    const hireDate = new Date(2019, 0, 1 + Math.floor(random() * 2450))

    return {
      id: crypto.randomUUID(),
      personnelNo: formatPersonnelNo(index + 1),
      firstName,
      lastName,
      email: `${firstName}.${lastName}${index + 1}@edu-center.uz`.toLowerCase(),
      phone: `+998 ${pick(['90', '91', '93', '94', '97', '99'])} ${digits(3)} ${digits(2)} ${digits(2)}`,
      department,
      position: pick(POSITIONS[department]),
      status: pick(STATUS_WEIGHTS),
      hireDate: hireDate.toISOString().slice(0, 10),
      salary: Math.round((3 + random() * 17) * 10) * 100_000,
    }
  })
}
