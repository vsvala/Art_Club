import { test, expect } from '@playwright/test'

const API = process.env.PLAYWRIGHT_API_URL || 'http://127.0.0.1:3001/api'
const FRONTEND_URL =
  process.env.PLAYWRIGHT_FRONTEND_URL || 'http://127.0.0.1:3000'

test.describe('Registration', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post(`${API}/testing/reset`)
    await page.goto(FRONTEND_URL)
  })

  test('new user can register and sees pending membership message', async ({
    page,
  }) => {
    await page.getByRole('link', { name: /register/i }).click()

    await page.getByPlaceholder('Name').fill('Maija Maalari')
    await page.getByPlaceholder('Email').fill('maija@test.com')
    await page.getByPlaceholder('Username').fill('maija')
    await page.getByPlaceholder('Password').fill('salasana123')

    await page.getByRole('button', { name: /apply/i }).click()

    await expect(
      page.getByText(/membership application will be processed soon/i),
    ).toBeVisible()
  })

  test('registered user does not see member links after registration', async ({
    page,
  }) => {
    await page.getByRole('link', { name: /register/i }).click()

    await page.getByPlaceholder('Name').fill('Maija Maalari')
    await page.getByPlaceholder('Email').fill('maija@test.com')
    await page.getByPlaceholder('Username').fill('maija')
    await page.getByPlaceholder('Password').fill('salasana123')

    await page.getByRole('button', { name: /apply/i }).click()

    await expect(page.getByRole('link', { name: /add artwork/i })).not.toBeVisible()
    await expect(page.getByRole('link', { name: /events/i })).not.toBeVisible()
  })

  test('shows error when username is already taken', async ({ page, request }) => {
    await request.post(`${API}/testing/users`, {
      data: {
        name: 'Olemassa Oleva',
        email: 'olemassa@test.com',
        username: 'maija',
        password: 'salasana123',
        role: 'member',
      },
    })

    await page.getByRole('link', { name: /register/i }).click()

    await page.getByPlaceholder('Name').fill('Toinen Maija')
    await page.getByPlaceholder('Email').fill('toinen@test.com')
    await page.getByPlaceholder('Username').fill('maija')
    await page.getByPlaceholder('Password').fill('salasana123')

    await page.getByRole('button', { name: /apply/i }).click()

    await expect(page.getByText('Username must be unique!')).toBeVisible()
  })

  test('register page shows terms and privacy links', async ({ page }) => {
    await page.getByRole('link', { name: /register/i }).click()

    await expect(page.getByRole('link', { name: /terms of use/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /privacy policy/i })).toBeVisible()
  })
})