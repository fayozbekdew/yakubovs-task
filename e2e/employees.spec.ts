import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('searches and filters the list', async ({ page }) => {
  await expect(page.getByRole('row')).toHaveCount(13)

  await page.getByPlaceholder(/Ism, tabel/).fill('XD-0001')
  await expect(page.getByRole('row')).toHaveCount(2)

  await page.getByPlaceholder(/Ism, tabel/).fill('mavjud-emas')
  await expect(page.getByText('Hech narsa topilmadi')).toBeVisible()
  await page.getByRole('button', { name: 'Filtrlarni tozalash' }).click()
  await expect(page.getByRole('row')).toHaveCount(13)
})

test('validates and creates an employee', async ({ page }) => {
  await page.getByRole('button', { name: "Xodim qo'shish" }).click()
  const sheet = page.getByRole('dialog')
  await sheet.getByRole('button', { name: "Qo'shish" }).click()
  await expect(sheet.getByText("Email formati noto'g'ri")).toBeVisible()

  await sheet.getByLabel('Familiya').fill('Testov')
  await sheet.getByLabel('Ism', { exact: true }).fill('Test')
  await sheet.getByLabel('Email').fill('test.testov@edu-center.uz')
  await sheet.getByLabel('Telefon').fill('+998 90 111 22 33')
  await sheet.getByLabel("Bo'lim").selectOption('it')
  await sheet.getByLabel('Lavozim').fill('QA muhandis')
  await sheet.getByLabel("Oylik maosh, so'm").fill('9000000')
  await sheet.getByRole('button', { name: "Qo'shish" }).click()

  await expect(page.getByText(/XD-0069 raqami bilan xodim qo'shildi/)).toBeVisible()
  await expect(page.getByRole('row', { name: /Testov Test/ })).toBeVisible()
})
