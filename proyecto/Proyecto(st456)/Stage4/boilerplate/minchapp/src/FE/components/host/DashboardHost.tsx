import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Post, UsuarioRegistrado } from '../../types/index';

interface DashboardHostProps {
  hostId: number;
}

const DashboardHost: React.FC<DashboardHostProps> = ({ hostId }) => {
  const [activePosts, setActivePosts] = useState<Post[]>([]);
  const [interestedCuidadores, setInterestedCuidadores] = useState<UsuarioRegistrado[]>([]);

  useEffect(() => {
    // Logica para pedir los posts activos y request de cuidadores
    setActivePosts([
      { id: 1, motivo: 'Cuidado de perro', fechaInicio: new Date('2023-07-15'), fechaFin: new Date('2023-07-20') },
      { id: 2, motivo: 'Cuidado de casa', fechaInicio: new Date('2023-08-01'), fechaFin: new Date('2023-08-10') },
    ] as Post[]);

    setInterestedCuidadores([
      { id: 1, nombre: 'Ana', apellido: 'García', ratingReviews: 4.8 },
      { id: 2, nombre: 'Carlos', apellido: 'Pérez', ratingReviews: 4.5 },
    ] as UsuarioRegistrado[]);
  }, [hostId]);

  return (
    <Container className="my-4">
      <h1>Dashboard del Host</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h5">Posts Activos</Card.Header>
            <ListGroup variant="flush">
              {activePosts.map(post => (
                <ListGroup.Item key={post.id}>
                  <div>{post.motivo}</div>
                  <small>
                    {post.fechaInicio.toLocaleDateString()} - {post.fechaFin.toLocaleDateString()}
                  </small>
                  <div>
                    <Button variant="outline-primary" size="sm" className="mt-2">
                      Ver Detalles
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
          <Link to="/publicar-necesidad">
            <Button variant="primary">
              Crear Nuevo Post
            </Button>
          </Link>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Cuidadores Interesados</Card.Header>
            <ListGroup variant="flush">
              {interestedCuidadores.map(cuidador => (
                <ListGroup.Item key={cuidador.id}>
                  <div>{`${cuidador.nombre} ${cuidador.apellido}`}</div>
                  <small>Rating: {cuidador.ratingReviews.toFixed(1)}</small>
                  <div>
                    <Link to={`/perfil-cuidador/${cuidador.id}`} className="me-2">
                      <Button 
                        variant="outline-info" 
                        size="sm" 
                        className="mt-2"
                      >
                        Ver Perfil
                      </Button>
                    </Link>
                    <Button variant="outline-success" size="sm" className="mt-2">
                      Contactar
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardHost;