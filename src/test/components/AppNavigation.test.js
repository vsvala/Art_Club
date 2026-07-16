import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navigation from '../../components/common/AppNavigation'

const renderNav = (props = {}) =>
  render(
    <MemoryRouter>
      <Navigation
        loggedUser={null}
        isMember={false}
        isAdmin={false}
        nonMember={false}
        logout={jest.fn()}
        {...props}
      />
    </MemoryRouter>,
  )

describe('AppNavigation — always visible links', () => {
  test('shows Home, Gallery and Artists links', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gallery/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /artists/i })).toBeInTheDocument()
  })
})

describe('AppNavigation — logged out', () => {
  test('shows Login button', () => {
    renderNav()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  test('shows Register link', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument()
  })

  test('does not show member links', () => {
    renderNav()
    expect(screen.queryByRole('link', { name: /add artwork/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /mypage/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /events/i })).not.toBeInTheDocument()
  })

  test('does not show Logout button', () => {
    renderNav()
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument()
  })
})

describe('AppNavigation — member', () => {
  const memberProps = {
    loggedUser: { id: '1', username: 'maija', role: 'member' },
    isMember: true,
    isAdmin: false,
    nonMember: false,
  }

  test('shows Logout button', () => {
    renderNav(memberProps)
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  test('shows username', () => {
    renderNav(memberProps)
    expect(screen.getByText('maija')).toBeInTheDocument()
  })

  test('shows member links', () => {
    renderNav(memberProps)
    expect(screen.getByRole('link', { name: /add artwork/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /events/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /change password/i })).toBeInTheDocument()
  })

  test('does not show admin links', () => {
    renderNav(memberProps)
    expect(screen.queryByRole('link', { name: /add event/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /^users$/i })).not.toBeInTheDocument()
  })

  test('calls logout when Logout button is clicked', () => {
    const logout = jest.fn()
    renderNav({ ...memberProps, logout })
    fireEvent.click(screen.getByRole('button', { name: /logout/i }))
    expect(logout).toHaveBeenCalledTimes(1)
  })
})

describe('AppNavigation — admin', () => {
  const adminProps = {
    loggedUser: { id: '2', username: 'admin', role: 'admin' },
    isMember: false,
    isAdmin: true,
    nonMember: false,
  }

  test('shows admin-only links', () => {
    renderNav(adminProps)
    expect(screen.getByRole('link', { name: /add event/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^users$/i })).toBeInTheDocument()
  })

  test('also shows member links', () => {
    renderNav(adminProps)
    expect(screen.getByRole('link', { name: /add artwork/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /events/i })).toBeInTheDocument()
  })
})