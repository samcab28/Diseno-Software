import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { GeoAlt, StarFill, CurrencyDollar } from 'react-bootstrap-icons';
import { Cuidador } from '../../types';

const ListaCuidadores: React.FC = () => {
  const [cuidadores, setCuidadores] = useState<Cuidador[]>([]);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');
  const [filtroPrecio, setFiltroPrecio] = useState('');

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
      (!filtroPrecio || cuidador.tarifa <= parseInt(filtroPrecio))
    );
  };

  const cuidadoresFiltrados = filtrarCuidadores();

  const EmojisEspecializados = (especialidad: string) => {
    switch (especialidad) {
      case 'Perros':
        return '🐶';
      case 'Gatos':
        return '🐱';
      case 'Aves':
        return '🦜';
      default:
        return '🐾';
    }
  };

  return (
    <Container fluid className="py-4 bg-light">
      <h2 className="text-center mb-4">Encuentra tu cuidador ideal</h2>
      
      <Row className="justify-content-center mb-4">
        <Col md={4} lg={3}>
          <Form.Select 
            value={filtroEspecialidad} 
            onChange={(e) => setFiltroEspecialidad(e.target.value)}
            className="mb-2"
          >
            <option value="">Todas las mascotas</option>
            <option value="Perros">🐶 Perros</option>
            <option value="Gatos">🐱 Gatos</option>
            <option value="Aves">🦜 Aves</option>
          </Form.Select>
        </Col>
        <Col md={4} lg={3}>
          <Form.Select 
            value={filtroPrecio} 
            onChange={(e) => setFiltroPrecio(e.target.value)}
            className="mb-2"
          >
            <option value="">Cualquier precio</option>
            <option value="15">Hasta $15/hora</option>
            <option value="20">Hasta $20/hora</option>
            <option value="25">Hasta $25/hora</option>
          </Form.Select>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        {cuidadoresFiltrados.map(cuidador => (
          <Col key={cuidador.id} md={6} lg={4} xl={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={cuidador.urlImagenPerfil} />
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {`${cuidador.nombre} ${cuidador.apellido}`}
                  <Badge bg="info" className="ms-2">
                    {EmojisEspecializados(cuidador.especialidad)} {cuidador.especialidad}
                  </Badge>
                </Card.Title>
                <Card.Text>
                  <StarFill className="text-warning me-1" />{cuidador.ratingReviews.toFixed(1)}
                  <br />
                  <GeoAlt className="me-1" />{cuidador.ciudadResidencia}
                  <br />
                  <CurrencyDollar className="me-1" />{cuidador.tarifa}/hora
                </Card.Text>
                <Button variant="primary" className="w-100">Ver perfil</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaCuidadores;