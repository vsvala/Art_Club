import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import logo from '../../images/tripleblue.svg'
import { Link } from 'react-router-dom'

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
              <Link to="/">Home </Link>&nbsp;
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/artworks">Gallery</Link> &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              <Link to="/artists">Artists</Link> &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              <Link to="/links">Links</Link> &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isMember || isAdmin ? (
                <Link to="/users/addArtwork" className="member">
                  Add artwork
                </Link>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isMember || isAdmin ? (
                <Link to={`/users/${loggedUser?.id}/myPage`} className="member">
                  MyPage
                </Link>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isMember || isAdmin ? (
                <Link to="/users/events" className="member">
                  Events
                </Link>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isMember || isAdmin ? (
                <Link to="/users/password" className="member">
                  Change password
                </Link>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isAdmin ? (
                <Link to="/admin/addEvent" className="admin">
                  Add event
                </Link>
              ) : (
                <em></em>
              )}{' '}
              &nbsp;
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {isAdmin ? (
                <Link to="/admin/users" className="admin">
                  Users
                </Link>
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
