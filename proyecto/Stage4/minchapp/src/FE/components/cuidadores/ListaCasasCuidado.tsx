import React, { useState } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';

interface Casa {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  ubicacion: string;
}

const ListaCasasCuidado: React.FC = () => {
  const [casas, setCasas] = useState<Casa[]>([
    {
      id: '1',
      titulo: 'Casa con jardín en San Jose ',
      descripcion: 'Hermosa casa con amplio jardín, con 3 gatos .',
      fechaInicio: '2023-07-01',
      fechaFin: '2023-07-15',
      ubicacion: 'San José, Costa Rica',
    },
    {
      id: '2',
      titulo: 'Apartamento céntrico en Escazú',
      descripcion: 'Cómodo apartamento cerca de la universidad.',
      fechaInicio: '2023-08-05',
      fechaFin: '2023-08-20',
      ubicacion: 'Escazú, Costa Rica',
    },
    // Ejemplos de casas
  ]);

  return (
    <div>
      <Form className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Control type="text" placeholder="Buscar por ubicación..." />
          </Col>
          <Col md={3}>
            <Form.Control type="date" placeholder="Fecha de inicio" />
          </Col>
          <Col md={3}>
            <Form.Control type="date" placeholder="Fecha de fin" />
          </Col>
        </Row>
      </Form>

      <Row>
        {casas.map((casa) => (
          <Col key={casa.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{casa.titulo}</Card.Title>
                <Card.Text>
                  {casa.descripcion}
                  <br />
                  <strong>Ubicación:</strong> {casa.ubicacion}
                  <br />
                  <strong>Desde:</strong> {casa.fechaInicio}
                  <br />
                  <strong>Hasta:</strong> {casa.fechaFin}
                </Card.Text>
                <Button variant="primary">Ver detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListaCasasCuidado;