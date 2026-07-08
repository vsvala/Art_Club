import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import logo from '../../images/tripleblue.svg'
import { Link } from 'react-router-dom'

export const Navigation = (props) => {
  const { loggedUser, isMember, isAdmin, nonMember, logout } = props
  const canSeeMemberLinks = isMember || isAdmin
  const isLoggedIn = isMember || isAdmin || nonMember

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/artworks', label: 'Gallery' },
    { to: '/artists', label: 'Artists' },
    { to: '/links', label: 'Links' },
  ]

  const memberLinks = canSeeMemberLinks
    ? [
        { to: '/users/addArtwork', label: 'Add artwork', className: 'member' },
        {
          to: `/users/${loggedUser?.id}/myPage`,
          label: 'MyPage',
          className: 'member',
        },
        { to: '/users/events', label: 'Events', className: 'member' },
        {
          to: '/users/password',
          label: 'Change password',
          className: 'member',
        },
      ]
    : []

  const adminLinks = isAdmin
    ? [
        { to: '/admin/addEvent', label: 'Add event', className: 'admin' },
        { to: '/admin/users', label: 'Users', className: 'admin' },
      ]
    : []

  const registerLink = !loggedUser ? (
    <Nav.Link href="#" as="span">
      <Link to="/register">Register&nbsp;</Link>&nbsp;
    </Nav.Link>
  ) : null

  const authButton = isLoggedIn ? (
    <Button className="button" onClick={logout} variant="light" type="button">
      Logout
    </Button>
  ) : (
    <Button as={Link} to="/login" className="button" variant="light" type="button">
      Login
    </Button>
  )

  return (
    <div className="NavBar">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        style={{ paddingLeft: '20px', paddingRight: '20px' }}
      >
        <Navbar.Brand>
          <img src={logo} className="nav-logo" alt="Art club LOGO" />
        </Navbar.Brand>
        <Navbar.Brand>Art club</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {publicLinks.map((item) => (
              <Nav.Link href="#" as="span" key={item.to}>
                <Link to={item.to}>{item.label}</Link>&nbsp;
              </Nav.Link>
            ))}

            {memberLinks.map((item) => (
              <Nav.Link href="#" as="span" key={item.to}>
                <Link to={item.to} className={item.className}>
                  {item.label}
                </Link>
                &nbsp;
              </Nav.Link>
            ))}

            {adminLinks.map((item) => (
              <Nav.Link href="#" as="span" key={item.to}>
                <Link to={item.to} className={item.className}>
                  {item.label}
                </Link>
                &nbsp;
              </Nav.Link>
            ))}
          </Nav>

          {registerLink}

          <Nav.Link href="#" as="span">
            {authButton}
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
export default Navigation
