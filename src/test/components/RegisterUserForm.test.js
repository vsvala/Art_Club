import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { RegisterUserForm } from '../../components/login/RegisterUserForm'
import Notification from '../../components/common/Notification'
import notificationReducer from '../../reducers/notificationReducer'
import userReducer from '../../reducers/userReducer'

const server = setupServer(
  rest.post('*/api/users', (req, res, ctx) =>
    res(ctx.json({ id: '99', username: 'uusi', role: 'nonMember' })),
  ),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = () =>
  createStore(
    combineReducers({ notification: notificationReducer, users: userReducer }),
    applyMiddleware(thunk),
  )

const renderForm = (store = createTestStore()) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Notification />
        <RegisterUserForm />
      </MemoryRouter>
    </Provider>,
  )

// jsdom does not implement HTMLFormElement's named getter in React's synthetic event
// system — event.target['fieldName'] returns undefined for all named controls.
// Patch all four fields as own properties on the form element before submit fires.
const patchFormNamedAccess = () => {
  const form = document.querySelector('form')
  ;['name', 'email', 'username', 'password'].forEach((fieldName) => {
    const el = form.elements.namedItem(fieldName)
    if (el) {
      Object.defineProperty(form, fieldName, {
        get: () => el,
        configurable: true,
      })
    }
  })
}

const fillAndSubmit = ({
  name = '',
  email = '',
  username = '',
  password = '',
} = {}) => {
  if (name)
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: name },
    })
  if (email)
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: email },
    })
  if (username)
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: username },
    })
  if (password)
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: password },
    })
  patchFormNamedAccess()
  fireEvent.submit(
    screen.getByRole('button', { name: /apply/i }).closest('form'),
  )
}

describe('RegisterUserForm — render', () => {
  test('shows heading and all form fields', () => {
    renderForm()
    expect(
      screen.getByText('Register and apply membership'),
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  test('shows Terms of use and Privacy Policy links', () => {
    renderForm()
    expect(
      screen.getByRole('link', { name: /terms of use/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /privacy policy/i }),
    ).toBeInTheDocument()
  })

  test('shows Apply button', () => {
    renderForm()
    expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument()
  })
})

describe('RegisterUserForm — password visibility toggle', () => {
  test('password is hidden by default', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute(
      'type',
      'password',
    )
  })

  test('clicking eye button reveals password', () => {
    renderForm()
    const toggleBtn = screen
      .getAllByRole('button')
      .find((b) => b !== screen.getByRole('button', { name: /apply/i }))
    fireEvent.click(toggleBtn)
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute(
      'type',
      'text',
    )
  })

  test('clicking toggle again hides password', () => {
    renderForm()
    const toggleBtn = screen
      .getAllByRole('button')
      .find((b) => b !== screen.getByRole('button', { name: /apply/i }))
    fireEvent.click(toggleBtn)
    fireEvent.click(toggleBtn)
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute(
      'type',
      'password',
    )
  })
})

describe('RegisterUserForm — validation', () => {
  test('shows error for invalid email', async () => {
    const store = createTestStore()
    renderForm(store)
    fillAndSubmit({
      name: 'Maija Maalari',
      email: 'ei-validi',
      username: 'maija',
      password: 'salasana1',
    })
    await waitFor(() =>
      expect(store.getState().notification).toBe('Please check your email'),
    )
  })

  test('shows error when name is too short', async () => {
    const store = createTestStore()
    renderForm(store)
    fillAndSubmit({
      name: 'Ab',
      email: 'maija@test.com',
      username: 'maija',
      password: 'salasana1',
    })
    await waitFor(() =>
      expect(store.getState().notification).toBe(
        'Name has to have at least 3 characters',
      ),
    )
  })

  test('shows error when username is too short', async () => {
    const store = createTestStore()
    renderForm(store)
    fillAndSubmit({
      name: 'Maija Maalari',
      email: 'maija@test.com',
      username: 'ab',
      password: 'salasana1',
    })
    await waitFor(() =>
      expect(store.getState().notification).toBe(
        'Username has to have at least 3 characters',
      ),
    )
  })

  test('shows error when password is too short', async () => {
    const store = createTestStore()
    renderForm(store)
    fillAndSubmit({
      name: 'Maija Maalari',
      email: 'maija@test.com',
      username: 'maija',
      password: 'lyhyt',
    })
    await waitFor(() =>
      expect(store.getState().notification).toBe(
        'Password has to have at least 8 characters',
      ),
    )
  })

  test('email is validated before name length', async () => {
    const store = createTestStore()
    renderForm(store)
    fillAndSubmit({
      name: 'Ab',
      email: 'ei-validi',
      username: 'maija',
      password: 'salasana1',
    })
    await waitFor(() =>
      expect(store.getState().notification).toBe('Please check your email'),
    )
  })

  test('error message is visible in UI', async () => {
    const store = createTestStore()
    renderForm(store)
    fillAndSubmit({
      name: 'Maija Maalari',
      email: 'ei-validi',
      username: 'maija',
      password: 'salasana1',
    })
    await waitFor(() => screen.getByText('Please check your email'))
    expect(screen.getByText('Please check your email')).toBeInTheDocument()
  })
})

describe('RegisterUserForm — API integration', () => {
  test('sends correct user data to API on valid submit', async () => {
    let requestBody
    server.use(
      rest.post('*/api/users', async (req, res, ctx) => {
        requestBody = await req.json()
        return res(ctx.json({ id: '99', username: 'maija', role: 'nonMember' }))
      }),
    )
    renderForm()
    fillAndSubmit({
      name: 'Maija Maalari',
      email: 'maija@test.com',
      username: 'maija',
      password: 'salasana123',
    })
    await waitFor(() => expect(requestBody).toBeDefined())
    expect(requestBody.email).toBe('maija@test.com')
    expect(requestBody.username).toBe('maija')
  })

  test('shows error when username is already taken', async () => {
    server.use(
      rest.post('*/api/users', (req, res, ctx) => res(ctx.status(400))),
    )
    const store = createTestStore()
    renderForm(store)
    fillAndSubmit({
      name: 'Maija Maalari',
      email: 'maija@test.com',
      username: 'maija',
      password: 'salasana123',
    })
    await waitFor(() =>
      expect(store.getState().notification).toBe('Username must be unique!'),
    )
  })
})
