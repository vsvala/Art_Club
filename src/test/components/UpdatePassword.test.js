import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import UpdatePassword from '../../components/user/UpdatePassword'
import Notification from '../../components/common/Notification'
import notificationReducer from '../../reducers/notificationReducer'

const server = setupServer(
  rest.put('*/api/users/password', (req, res, ctx) => res(ctx.json({ success: true }))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = () =>
  createStore(
    combineReducers({ notification: notificationReducer }),
    applyMiddleware(thunk),
  )

const renderForm = () =>
  render(
    <Provider store={createTestStore()}>
      <Notification />
      <UpdatePassword />
    </Provider>,
  )

describe('UpdatePassword — render', () => {
  test('shows Change password heading', () => {
    renderForm()
    expect(screen.getByText('Change password')).toBeInTheDocument()
  })

  test('renders all password fields', () => {
    renderForm()
    expect(screen.getByPlaceholderText('Old Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('New Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()
  })
})

describe('UpdatePassword — validation (via userService)', () => {
  test('shows error when new password is too short', async () => {
    renderForm()
    fireEvent.change(screen.getByPlaceholderText('Old Password'), { target: { name: 'oldPassword', value: 'vanha123' } })
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { name: 'newPassword', value: 'lyhyt' } })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { name: 'confirm', value: 'lyhyt' } })
    fireEvent.submit(screen.getByRole('button', { name: /update/i }).closest('form'))
    await waitFor(() => screen.getByText('Password needs to be at least 8 characters long'))
    expect(screen.getByText('Password needs to be at least 8 characters long')).toBeInTheDocument()
  })

  test('shows error when passwords do not match', async () => {
    renderForm()
    fireEvent.change(screen.getByPlaceholderText('Old Password'), { target: { name: 'oldPassword', value: 'vanha123' } })
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { name: 'newPassword', value: 'uusisalasana1' } })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { name: 'confirm', value: 'eriSalasana1' } })
    fireEvent.submit(screen.getByRole('button', { name: /update/i }).closest('form'))
    await waitFor(() => screen.getByText('Make sure the new password and the confirmation match'))
    expect(screen.getByText('Make sure the new password and the confirmation match')).toBeInTheDocument()
  })

  test('shows success message on valid password change', async () => {
    renderForm()
    fireEvent.change(screen.getByPlaceholderText('Old Password'), { target: { name: 'oldPassword', value: 'vanha123' } })
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { name: 'newPassword', value: 'uusisalasana1' } })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { name: 'confirm', value: 'uusisalasana1' } })
    fireEvent.submit(screen.getByRole('button', { name: /update/i }).closest('form'))
    await waitFor(() => screen.getByText('Password updated successfully!'))
    expect(screen.getByText('Password updated successfully!')).toBeInTheDocument()
  })

  test('shows error when server rejects old password', async () => {
    server.use(
      rest.put('*/api/users/password', (req, res, ctx) => res(ctx.status(401))),
    )
    renderForm()
    fireEvent.change(screen.getByPlaceholderText('Old Password'), { target: { name: 'oldPassword', value: 'vaara123' } })
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { name: 'newPassword', value: 'uusisalasana1' } })
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { name: 'confirm', value: 'uusisalasana1' } })
    fireEvent.submit(screen.getByRole('button', { name: /update/i }).closest('form'))
    await waitFor(() => screen.getByText('Old password is incorrect!'))
    expect(screen.getByText('Old password is incorrect!')).toBeInTheDocument()
  })
})