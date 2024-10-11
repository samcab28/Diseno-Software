import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import { Header } from './FE/components/common/Header';
import Footer from './FE/components/common/Footer';
import PublishCareNeed from './FE/components/host/PublishCareNeed';
import FormularioContacto from './FE/components/host/FormularioContacto';
import ListaCasasCuidado from './FE/components/cuidadores/ListaCasasCuidado';
import PerfilCuidador from './FE/components/cuidadores/PerfilCuidador';
import ListaCuidadores from './FE/components/cuidadores/ListaCuidadores';
import ComparacionCuidadores from './FE/components/cuidadores/ComparacionCuidadores';
import CareRequestList from './FE/components/cuidadores/CareRequestList';
import UserProfile from './FE/components/profile/UserProfile';

const Home = () => (
  <Container className="mt-4">
    <h1>Bienvenido a Minchapp</h1>
    <p>Conectamos cuidadores confiables con hogares que necesitan atención.</p>
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
                <Nav.Link as={Link} to="/perfil-cuidador">Perfil Cuidador</Nav.Link>
                <Nav.Link as={Link} to="/publicar-necesidad">Publicar Necesidad</Nav.Link>
                <Nav.Link as={Link} to="/explorar-necesidades">Explorar Necesidades</Nav.Link>
                <Nav.Link as={Link} to="/perfil-usuario">Perfil Usuario</Nav.Link>
                <Nav.Link as={Link} to="/formulario-contacto">Contacto</Nav.Link>
                <Nav.Link as={Link} to="/lista-cuidadores">Lista Cuidadores</Nav.Link>
                <Nav.Link as={Link} to="/comparacion-cuidadores">Comparar Cuidadores</Nav.Link>
                <Nav.Link as={Link} to="/care-request-list">Solicitudes de Cuidado</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil-cuidador" element={<PerfilCuidador idCuidador={1} />} />
          <Route path="/publicar-necesidad" element={<PublishCareNeed />} />
          <Route path="/explorar-necesidades" element={<ListaCasasCuidado />} />
          <Route path="/perfil-usuario" element={<UserProfile user={{
            id: 1,
            nombre: 'Usuario',
            apellido: 'Ejemplo',
            contrasena: 'Hola',
            fechaNacimiento: new Date('1990-01-01'),
            ciudadResidencia: 'Ciudad Ejemplo',
            urlImagenPerfil: 'https://example.com/profile.jpg',
            telefono: '1234567890',
            email: 'usuario@ejemplo.com',
            cedula: '1234567890',
            hojaDelincuencia: true,
            tarjetaCredito: '1234-5678-9012-3456',
            ratingReviews: 4.5,
            tipoUsuario: 'host'
          }} />} />
          <Route path="/formulario-contacto" element={<FormularioContacto idCuidador={1} />} />
          <Route path="/lista-cuidadores" element={<ListaCuidadores />} />
          <Route path="/comparacion-cuidadores" element={<ComparacionCuidadores />} />
          <Route path="/care-request-list" element={<CareRequestList solicitudes={[]} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;