import React, { useState } from 'react';
import { Card, Button, Row, Col, Form, Container } from 'react-bootstrap';
import { CasaCuidado } from '../../types';

const ListaCasasCuidado: React.FC = () => {
  const [casas, setCasas] = useState<CasaCuidado[]>([
    {
      id: 1,
      idUsuario: 1,
      idDireccion: 1,
      titulo: 'Casa con jardín en San Jose',
      descripcionBase: 'Hermosa casa con amplio jardín, con 3 gatos.',
      numHabitaciones: 3,
      numBanos: 2,
      descripcionCuidados: 'Cuidado de 3 gatos, regar plantas',
      piscina: false,
      jardin: true,
      mascotas: true,
      fechaInicio: new Date('2023-07-01'),
      fechaFin: new Date('2023-07-15')
    },
    {
      id: 2,
      idUsuario: 2,
      idDireccion: 2,
      titulo: 'Apartamento céntrico en Escazú',
      descripcionBase: 'Cómodo apartamento cerca de la universidad.',
      numHabitaciones: 2,
      numBanos: 1,
      descripcionCuidados: 'Cuidado de plantas y recibir correo',
      piscina: false,
      jardin: false,
      mascotas: false,
      fechaInicio: new Date('2023-08-05'),
      fechaFin: new Date('2023-08-20')
    },
  ]);

  const [filtroUbicacion, setFiltroUbicacion] = useState('');
  const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
  const [filtroFechaFin, setFiltroFechaFin] = useState('');

  const filtrarCasas = () => {
    return casas.filter(casa => 
      (!filtroUbicacion || casa.titulo.toLowerCase().includes(filtroUbicacion.toLowerCase())) &&
      (!filtroFechaInicio || new Date(casa.fechaInicio) >= new Date(filtroFechaInicio)) &&
      (!filtroFechaFin || new Date(casa.fechaFin) <= new Date(filtroFechaFin))
    );
  };

  const casasFiltradas = filtrarCasas();

  return (
    <Container>
      <h2 className="my-4">Casas disponibles para cuidar</h2>
      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Control 
              type="text" 
              placeholder="Buscar por ubicación..." 
              value={filtroUbicacion}
              onChange={(e) => setFiltroUbicacion(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Control 
              type="date" 
              placeholder="Fecha de inicio" 
              value={filtroFechaInicio}
              onChange={(e) => setFiltroFechaInicio(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Control 
              type="date" 
              placeholder="Fecha de fin" 
              value={filtroFechaFin}
              onChange={(e) => setFiltroFechaFin(e.target.value)}
            />
          </Col>
        </Row>
      </Form>

      <Row>
        {casasFiltradas.map((casa) => (
          <Col key={casa.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{casa.titulo}</Card.Title>
                <Card.Text>
                  {casa.descripcionBase}
                  <br />
                  <strong>Habitaciones:</strong> {casa.numHabitaciones}
                  <br />
                  <strong>Baños:</strong> {casa.numBanos}
                  <br />
                  <strong>Desde:</strong> {casa.fechaInicio.toLocaleDateString()}
                  <br />
                  <strong>Hasta:</strong> {casa.fechaFin.toLocaleDateString()}
                  <br />
                  <strong>Características:</strong>
                  {casa.piscina && ' Piscina,'}
                  {casa.jardin && ' Jardín,'}
                  {casa.mascotas && ' Mascotas'}
                </Card.Text>
                <Button variant="primary">Ver detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaCasasCuidado;