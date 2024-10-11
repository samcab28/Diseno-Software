import React from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { Post, InfoCasa } from '../../types';

interface SolicitudCuidado extends Post {
  infoCasa: InfoCasa;
}

const CareRequestList: React.FC<{ solicitudes: SolicitudCuidado[] }> = ({ solicitudes }) => {
  return (
    <Row>
      {solicitudes.map((solicitud) => (
        <Col key={solicitud.id} md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{solicitud.motivo}</Card.Title>
              <Card.Text>
                <Badge bg="info" className="me-2">Inicio: {solicitud.fechaInicio.toLocaleDateString()}</Badge>
                <Badge bg="info">Fin: {solicitud.fechaFin.toLocaleDateString()}</Badge>
              </Card.Text>
              <Card.Text>
                {solicitud.infoCasa.descripcionBase}
              </Card.Text>
              <Button variant="outline-primary">Ver detalles</Button>
              <Button variant="primary" className="ms-2">Me interesa</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CareRequestList;