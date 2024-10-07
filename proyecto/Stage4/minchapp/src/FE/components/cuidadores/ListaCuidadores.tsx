import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { Search, GeoAlt, StarFill } from 'react-bootstrap-icons';
import { Cuidador } from '../../types';

const ListaCuidadores: React.FC = () => {
  const [cuidadores, setCuidadores] = useState<Cuidador[]>([]);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');
  const [filtroPrecio, setFiltroPrecio] = useState('');
  const [filtroDistancia, setFiltroDistancia] = useState('');

  useEffect(() => {
    // Simular carga de datos de cuidadores
    const cuidadoresMock: Cuidador[] = [
      { 
        id: 1, 
        nombre: 'Pamela', 
        apellido: 'Morataya',
        fechaNacimiento: new Date('1990-01-01'),
        ciudadResidencia: 'San José',
        urlImagenPerfil: '/img/pamela.jpg',
        telefono: '12345678',
        email: 'pamela@example.com',
        contrasena: 'hashedpassword',
        cedula: '123456789',
        hojaDelincuencia: true,
        tarjetaCredito: '1234-5678-9012-3456',
        ratingReviews: 4.8,
        tipoUsuario: 'cuidador',
        especialidad: 'Perros',
        experiencia: '5 años',
        tarifa: 20,
        disponibilidad: 'Lun-Vie',
        descripcion: 'Amante de los animales con experiencia en cuidado de perros.',
        credenciales: ['Certificado en primeros auxilios para mascotas']
      },
      {
        id: 2,
        nombre: 'Juan',
        apellido: 'Pérez',
        fechaNacimiento: new Date('1985-05-15'),
        ciudadResidencia: 'Cartago',
        urlImagenPerfil: '/img/juan.jpg',
        telefono: '87654321',
        email: 'juan@example.com',
        contrasena: 'hashedpassword',
        cedula: '987654321',
        hojaDelincuencia: true,
        tarjetaCredito: '6543-2109-8765-4321',
        ratingReviews: 4.5,
        tipoUsuario: 'cuidador',
        especialidad: 'Gatos',
        experiencia: '3 años',
        tarifa: 15,
        disponibilidad: 'Lun-Vie',
        descripcion: 'Amante de los animales con experiencia en cuidado de gatos.',
        credenciales: ['Certificado en primeros auxilios para mascotas']
      }
    ];
    setCuidadores(cuidadoresMock);
  }, []);

  const filtrarCuidadores = () => {
    return cuidadores.filter(cuidador => 
      (!filtroEspecialidad || cuidador.especialidad === filtroEspecialidad) &&
      (!filtroPrecio || cuidador.tarifa <= parseInt(filtroPrecio)) &&
      (!filtroDistancia || cuidador.ciudadResidencia.includes(filtroDistancia))
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
            <Form.Control 
              type="text" 
              placeholder="Ciudad" 
              value={filtroDistancia}
              onChange={(e) => setFiltroDistancia(e.target.value)}
            />
          </Col>
        </Row>
      </Form>
      
      <Row>
        {cuidadoresFiltrados.map(cuidador => (
          <Col key={cuidador.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={cuidador.urlImagenPerfil} />
              <Card.Body>
                <Card.Title>{`${cuidador.nombre} ${cuidador.apellido}`}</Card.Title>
                <Card.Text>
                  <StarFill className="text-warning" /> {cuidador.ratingReviews}/5
                  <br />
                  <Badge bg="info">{cuidador.especialidad}</Badge>
                  <br />
                  <GeoAlt /> {cuidador.ciudadResidencia}
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