import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import { Header } from './FE/components/common/Header';
import Footer from './FE/components/common/Footer';
import ListaCuidadores from './FE/components/cuidadores/ListaCuidadores';
import PerfilCuidador from './FE/components/cuidadores/PerfilCuidador';
import ComparacionCuidadores from './FE/components/cuidadores/ComparacionCuidadores';
import FormularioContacto from './FE/components/host/FormularioContacto';
import { PublishCareNeed } from './FE/components/host/PublishCareNeed';
import { UserProfile } from './FE/components/profile/UserProfile';
import ListaCasasCuidado from './FE/components/cuidadores/ListaCasasCuidado'; 

const Home = () => (
  <Container className="mt-4">
    <h1>Bienvenido a Minchapp</h1>
    <p>Encuentra el cuidador perfecto para tu mascota o una casa para cuidar.</p>
  </Container>
);

const BusquedaCuidadores = () => (
  <Container className="mt-4">
    <h2>Busca Cuidadores</h2>
    <ListaCuidadores />
  </Container>
);

const DetalleCuidador = () => (
  <Container className="mt-4">
    <h2>Perfil del Cuidador</h2>
    <PerfilCuidador />
    <h3 className="mt-4">Contacta al Cuidador</h3>
    <FormularioContacto />
  </Container>
);

const ComparaCuidadores = () => (
  <Container className="mt-4">
    <h2>Compara Cuidadores</h2>
    <ComparacionCuidadores />
  </Container>
);

const PublicarNecesidadCuidado = () => (
  <Container className="mt-4">
    <h2>Publicar Necesidad de Cuidado</h2>
    <PublishCareNeed />
  </Container>
);

const PerfilUsuario = () => (
  <Container className="mt-4">
    <h2>Mi Perfil</h2>
    <UserProfile name="Samir Puki" email="SamirPuki@gmail.com" phone="8456-7890" address="Calle de mi casa 123" />
  </Container>
);

const CasasParaCuidar = () => (
  <Container className="mt-4">
    <h2>Casas Disponibles para Cuidar</h2>
    <ListaCasasCuidado />
  </Container>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/buscar-cuidadores">Buscar Cuidadores</Nav.Link>
                <Nav.Link as={Link} to="/publicar-cuidado">Publicar Necesidad</Nav.Link>
                <Nav.Link as={Link} to="/casas-para-cuidar">Casas para Cuidar</Nav.Link>
                <Nav.Link as={Link} to="/comparar">Comparar Cuidadores</Nav.Link>
                <Nav.Link as={Link} to="/perfil">Mi Perfil</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar-cuidadores" element={<BusquedaCuidadores />} />
          <Route path="/perfil-cuidador" element={<DetalleCuidador />} />
          <Route path="/comparar" element={<ComparaCuidadores />} />
          <Route path="/publicar-cuidado" element={<PublicarNecesidadCuidado />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/casas-para-cuidar" element={<CasasParaCuidar />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;