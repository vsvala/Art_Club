import { test, expect } from '@playwright/test'

const url = 'http://localhost:3000'
const publicRoutes = [
  `${url}/`,
  `${url}/artworks`,
  `${url}/artists`,
  `${url}/links`,
  `${url}/register`,
  `${url}/login`,
]

for (const route of publicRoutes) {
  test(`${route} pages load without crashing`, async ({ page }) => {
    await page.goto(route)
    await expect(page).not.toHaveTitle(/Error/)
  })
}
