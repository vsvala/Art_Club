import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import logo from '../../images/tripleblue.svg'
import { Link, NavLink } from 'react-router-dom'

export const Navigation = (props) => {
  const { loggedUser, isMember, isAdmin, nonMember, logout } = props
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
            <Nav.Link href="#" as="span">
              <NavLink to="/" end>
                Home{' '}
              </NavLink>
              &nbsp;
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <NavLink to="/artworks">Gallery</NavLink> &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              <NavLink to="/artists">Artists</NavLink> &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              <NavLink to="/links">Links</NavLink> &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isMember || isAdmin ? (
                <NavLink to="/users/addArtwork" className="member">
                  Add artwork
                </NavLink>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isMember || isAdmin ? (
                <NavLink
                  to={`/users/${loggedUser?.id}/myPage`}
                  className="member"
                >
                  MyPage
                </NavLink>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isMember || isAdmin ? (
                <NavLink to="/users/events" className="member">
                  Events
                </NavLink>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isMember || isAdmin ? (
                <NavLink to="/users/password" className="member">
                  Change password
                </NavLink>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isAdmin ? (
                <NavLink to="/admin/addEvent" className="admin">
                  Add event
                </NavLink>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isAdmin ? (
                <NavLink to="/admin/users" className="admin">
                  Users
                </NavLink>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>
          </Nav>
          <Nav.Link href="#" as="span">
            {!loggedUser ? (
              <Link to="/register">Register&nbsp;</Link>
            ) : (
              <em></em>
            )}{' '}
            &nbsp;
          </Nav.Link>
          {isMember || isAdmin || nonMember ? (
            <span>{loggedUser?.username}</span>
          ) : null}
          &nbsp;
          <Nav.Link href="#" as="span">
            {isMember || isAdmin || nonMember ? (
              <Button
                className="button"
                onClick={logout}
                variant="light"
                type="button"
              >
                Logout
              </Button>
            ) : (
              <Button
                as={Link}
                to="/login"
                className="button"
                variant="light"
                type="button"
              >
                Login
              </Button>
            )}
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
export default Navigation
