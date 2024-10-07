import React from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';

interface CareRequest {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
}

const CareRequestList: React.FC<{ requests: CareRequest[] }> = ({ requests }) => {
  return (
    <Row>
      {requests.map((request) => (
        <Col key={request.id} md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{request.description}</Card.Title>
              <Card.Text>
                <Badge bg="info" className="me-2">Inicio: {request.startDate}</Badge>
                <Badge bg="info">Fin: {request.endDate}</Badge>
              </Card.Text>
              <Button variant="outline-primary">Ver detalles</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export { CareRequestList };