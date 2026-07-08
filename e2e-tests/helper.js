const loginWith = async (page, username, password) => {
  await page.getByRole('link', { name: 'Login' }).click()
  await page.getByPlaceholder('Username').fill(username)
  await page.getByPlaceholder('Password').fill(password)
  await page.locator('form').getByRole('button', { name: 'Login' }).click()
}

export { loginWith }
