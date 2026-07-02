const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Art_Club app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.locator('h1')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Welcome To Art Club!')).toBeVisible()
  })
  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByPlaceholder('Username').fill('testadmin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.locator('form').getByRole('button', { name: 'Login' }).click()
    await expect(page.getByRole('link', { name: 'Users' })).toBeVisible()
  })
})
