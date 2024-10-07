import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { House, Bell, Calendar } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const HostHomePage: React.FC = () => {
  return (
    <Container className="my-4">
      <h1>Bienvenido a Minchapp</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title><House className="me-2" />Publicar Necesidad de Cuidado</Card.Title>
              <Card.Text>
                Crea una nueva publicación para encontrar un cuidador para tu casa y/o mascotas.
              </Card.Text>
              <Link to="/publish-care-need">
                <Button variant="primary">Crear Publicación</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title><Bell className="me-2" />Solicitudes Pendientes</Card.Title>
              <Card.Text>
                Revisa las solicitudes de cuidadores interesados.
              </Card.Text>
              <Link to="/pending-requests">
                <Button variant="outline-primary">Ver Solicitudes</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title><Calendar className="me-2" />Cuidados Activos</Card.Title>
              <Card.Text>
                Gestiona tus cuidados actualmente en progreso.
              </Card.Text>
              <Link to="/active-cares">
                <Button variant="outline-primary">Ver Cuidados Activos</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HostHomePage;