import React from 'react'
import { render, screen } from '@testing-library/react'
import TermsOfUse from '../../components/common/TermsOfUse'
import GDPRInfo from '../../components/common/GDPRInfo'

describe('TermsOfUse', () => {
  test('renders main heading', () => {
    render(<TermsOfUse />)
    expect(screen.getByText('Terms of Use')).toBeInTheDocument()
  })

  test('shows upload limit of 10 images', () => {
    render(<TermsOfUse />)
    expect(screen.getByText(/up to 10 images/i)).toBeInTheDocument()
  })

  test('shows contact email', () => {
    render(<TermsOfUse />)
    const links = screen.getAllByRole('link')
    const emailLink = links.find((l) => l.href.includes('mailto:'))
    expect(emailLink).toBeInTheDocument()
  })
})

describe('GDPRInfo', () => {
  test('renders privacy policy heading', () => {
    render(<GDPRInfo />)
    expect(screen.getByText('Privacy Policy Statement')).toBeInTheDocument()
  })

  test('states data is not transferred outside EU', () => {
    render(<GDPRInfo />)
    expect(screen.getByText(/not transferred to third parties or outside EU/i)).toBeInTheDocument()
  })
})