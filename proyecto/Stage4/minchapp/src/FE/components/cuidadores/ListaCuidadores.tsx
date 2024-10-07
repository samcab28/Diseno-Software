import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { Search, GeoAlt, Star, StarFill } from 'react-bootstrap-icons';

interface Cuidador {
  id: string;
  nombre: string;
  calificacion: number;
  especialidad: string;
  foto: string;
  distancia: number;
  tarifa: number;
}

const ListaCuidadores: React.FC = () => {
  const [cuidadores, setCuidadores] = useState<Cuidador[]>([]);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');
  const [filtroPrecio, setFiltroPrecio] = useState('');
  const [filtroDistancia, setFiltroDistancia] = useState('');
  const [ubicacionUsuario, setUbicacionUsuario] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    // Simular carga de datos de cuidadores
    const cuidadoresMock: Cuidador[] = [
      { id: '1', nombre: 'Pamela Morataya', calificacion: 4.8, especialidad: 'Perros', foto: '/img/pamela.jpg', distancia: 2.5, tarifa: 20 },
      { id: '2', nombre: 'Luis Urbina', calificacion: 4.5, especialidad: 'Gatos', foto: '/img/luis.jpg', distancia: 3.7, tarifa: 18 },
      // Más cuidadores...
    ];
    setCuidadores(cuidadoresMock);

    // Obtener ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUbicacionUsuario(position.coords),
        (error) => console.error('Error obteniendo ubicación:', error)
      );
    }
  }, []);

  const filtrarCuidadores = () => {
    // TODO: Falta la logica para el filtrado
    return cuidadores.filter(cuidador => 
      (!filtroEspecialidad || cuidador.especialidad === filtroEspecialidad) &&
      (!filtroPrecio || cuidador.tarifa <= parseInt(filtroPrecio)) &&
      (!filtroDistancia || cuidador.distancia <= parseInt(filtroDistancia))
    );
  };

  const cuidadoresFiltrados = filtrarCuidadores();

  return (
    <Container>
      <h2 className="my-4">Encuentra tu cuidador ideal</h2>
      
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <InputGroup>
              <Form.Control type="text" placeholder="Buscar cuidadores..." />
              <Button variant="outline-secondary">
                <Search />
              </Button>
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select value={filtroEspecialidad} onChange={(e) => setFiltroEspecialidad(e.target.value)}>
              <option value="">Especialidad</option>
              <option value="Perros">Perros</option>
              <option value="Gatos">Gatos</option>
              <option value="Aves">Aves</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={filtroPrecio} onChange={(e) => setFiltroPrecio(e.target.value)}>
              <option value="">Precio máximo</option>
              <option value="15">$15/hora</option>
              <option value="20">$20/hora</option>
              <option value="25">$25/hora</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={filtroDistancia} onChange={(e) => setFiltroDistancia(e.target.value)}>
              <option value="">Distancia máxima</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="20">20 km</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
      
      <Row>
        {cuidadoresFiltrados.map(cuidador => (
          <Col key={cuidador.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={cuidador.foto} />
              <Card.Body>
                <Card.Title>{cuidador.nombre}</Card.Title>
                <Card.Text>
                  <StarFill className="text-warning" /> {cuidador.calificacion}/5
                  <br />
                  <Badge bg="info">{cuidador.especialidad}</Badge>
                  <br />
                  <GeoAlt /> {cuidador.distancia.toFixed(1)} km
                  <br />
                  ${cuidador.tarifa}/hora
                </Card.Text>
                <Button variant="primary">Ver perfil</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaCuidadores;