import { test, expect } from '@playwright/test'

const url = 'http://localhost:3000'
const guardedRoutes = [
  `${url}/users/addArtwork`,
  `${url}/users/events`,
  `${url}/admin/users`,
  `${url}/admin/addEvent`,
]

for (const route of guardedRoutes) {
  test(`guarded route ${route} redirects to login`, async ({ page }) => {
    await page.goto(route)
    await expect(page).toHaveURL(/\/login/)
  })
}
