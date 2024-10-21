import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand href="/">Minchapp 🐾</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="Más" id="basic-nav-dropdown">
              <NavDropdown.Item href="/settings">Configuraciones</NavDropdown.Item>
              <NavDropdown.Item href="/help">Ayuda</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { Header };