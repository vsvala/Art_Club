import { test, expect } from '@playwright/test'
import { loginWith } from './helper'

const API = process.env.PLAYWRIGHT_API_URL || 'http://127.0.0.1:3001/api'
const FRONTEND_URL =
  process.env.PLAYWRIGHT_FRONTEND_URL || 'http://127.0.0.1:3000'

test.describe('Art Club app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post(`${API}/testing/reset`)
    await request.post(`${API}/testing/users`, {
      data: {
        name: 'Test Member',
        email: 'testmember@test.com',
        username: 'testmember',
        password: 'member123',
        role: 'member',
      },
    })
    await request.post(`${API}/testing/users`, {
      data: {
        name: 'Test Admin',
        email: 'testadmin@test.com',
        username: 'testadmin',
        password: 'admin123',
        role: 'admin',
      },
    })
    await page.goto(FRONTEND_URL)
  })

  test('front page can be opened', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Welcome To Art Club!' }),
    ).toBeVisible()
  })

  test('user can log in as member', async ({ page }) => {
    await loginWith(page, 'testmember', 'member123')
    await expect(page.getByRole('link', { name: 'Add artwork' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'MyPage' })).toBeVisible()
  })

  test('user can log out', async ({ page }) => {
    await loginWith(page, 'testmember', 'member123')
    await page.getByRole('link', { name: 'Add artwork' }).click()
    await page.getByRole('button', { name: 'Logout' }).click()
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
  })

  test('user can log in as admin', async ({ page }) => {
    await loginWith(page, 'testadmin', 'admin123')
    await expect(page.getByRole('link', { name: 'Users' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
  })

  test.describe('when logged in as admin', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'testadmin', 'admin123')
    })

    test('admin can navigate to users list', async ({ page }) => {
      await page.getByRole('link', { name: 'Users' }).click()
      await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()
    })

    test('admin can add and delete artwork', async ({ page }) => {
      await page.getByRole('link', { name: 'Add artwork' }).click()
      await page.getByPlaceholder('Artist').fill('testartist')
      await page.getByPlaceholder('Name of artwork').fill('testart')
      await page.getByPlaceholder('Year').fill('2006')
      await page.getByPlaceholder('Size (width x hight) cm').fill('20x20 cm')
      await page.getByPlaceholder('Medium').fill('oil on canvas')
      await page
        .locator('input[type="file"]')
        .setInputFiles('tests/test-image.png')
      await page.getByRole('button', { name: 'Send' }).click()
      await page.waitForURL('**/myPage')

      await page.getByRole('link', { name: 'Gallery' }).click()
      await expect(page.getByText('testart')).toBeVisible({ timeout: 10000 })

      page.once('dialog', (dialog) => dialog.accept())
      await page
        .locator('ul')
        .filter({ hasText: 'testart' })
        .getByRole('button', { name: 'Delete' })
        .click()

      await expect(page.getByText('testart')).not.toBeVisible()

      await page.getByRole('button', { name: 'Logout' }).click()
    })
  })
})
