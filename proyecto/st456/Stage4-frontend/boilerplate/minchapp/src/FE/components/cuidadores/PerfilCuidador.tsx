import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Usuario, ServicioAdicional, Review } from '../../types/index';
import mockApiCuidador from '../../services/mockApiCuidador';

interface PerfilCuidadorExtendido extends Usuario {
  servicios: ServicioAdicional[];
  calificacion: number;
  experiencia: string;
  reviews: Review[];
}

const PerfilCuidador: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cuidador, setCuidador] = useState<PerfilCuidadorExtendido | null>(null);
  const [interesExpresado, setInteresExpresado] = useState(false);

  useEffect(() => {
    const fetchCuidador = async () => {
      try {
        if (id) {
          const cuidadorData = await mockApiCuidador.getCuidadorPerfil(id);
          setCuidador(cuidadorData);
        }
      } catch (error) {
        console.error('Error fetching cuidador profile:', error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    };

    fetchCuidador();
  }, [id]);

  const handleExpresarInteres = () => {
    // Aquí normalmente enviarías una solicitud al backend para expresar interés
    console.log(`Interés expresado en el cuidador ${id}`);
    setInteresExpresado(true);
  };

  if (!cuidador) {
    return <div>Cargando...</div>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={cuidador.urlImagenPerfil} />
            <Card.Body>
              <Card.Title>{`${cuidador.nombre} ${cuidador.apellido1}`}</Card.Title>
              <Card.Text>
                Calificación: {cuidador.calificacion.toFixed(1)} ⭐<br />
                Experiencia: {cuidador.experiencia}
              </Card.Text>
              {!interesExpresado ? (
                <Button variant="primary" onClick={handleExpresarInteres}>Expresar Interés</Button>
              ) : (
                <Button variant="success" disabled>Interés Expresado</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Servicios Ofrecidos</Card.Title>
              <ListGroup variant="flush">
                {cuidador.servicios.map(servicio => (
                  <ListGroup.Item key={servicio.idServicio}>
                    {servicio.descripcion}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Reseñas</Card.Title>
              {cuidador.reviews.map(review => (
                <Card key={review.id} className="mb-2">
                  <Card.Body>
                    <Card.Title>{review.calificacion} ⭐</Card.Title>
                    <Card.Text>{review.comentario}</Card.Text>
                    <Card.Footer className="text-muted">
                      Fecha: {review.fecha.toLocaleDateString()}
                    </Card.Footer>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PerfilCuidador;