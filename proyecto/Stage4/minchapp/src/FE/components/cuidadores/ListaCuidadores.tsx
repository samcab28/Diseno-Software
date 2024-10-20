import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Usuario, ServicioAdicional } from '../../types/index';
import mockApiCuidador from '../../services/mockApiCuidador';

interface CuidadorConServicios extends Usuario {
  servicios: ServicioAdicional[];
  calificacion: number;
}

const ListaCuidadores: React.FC = () => {
  const [cuidadores, setCuidadores] = useState<CuidadorConServicios[]>([]);
  const [filtroServicio, setFiltroServicio] = useState('');

  useEffect(() => {
    const fetchCuidadores = async () => {
      try {
        const cuidadoresData = await mockApiCuidador.getCuidadores();
        setCuidadores(cuidadoresData);
      } catch (error) {
        console.error('Error fetching cuidadores:', error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    };

    fetchCuidadores();
  }, []);

  const cuidadoresFiltrados = cuidadores.filter(cuidador => 
    !filtroServicio || cuidador.servicios.some(s => s.descripcion.toLowerCase().includes(filtroServicio.toLowerCase()))
  );

  return (
    <Container fluid className="py-4">
      <h2 className="text-center mb-4">Cuidadores Disponibles</h2>
      
      <Form.Group className="mb-3">
        <Form.Control 
          type="text"
          placeholder="Filtrar por servicio"
          value={filtroServicio}
          onChange={(e) => setFiltroServicio(e.target.value)}
        />
      </Form.Group>
      
      <Row>
        {cuidadoresFiltrados.map((cuidador) => (
          <Col key={cuidador.idUsuario} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={cuidador.urlImagenPerfil} />
              <Card.Body>
                <Card.Title>{`${cuidador.nombre} ${cuidador.apellido1}`}</Card.Title>
                <Card.Text>
                  Calificación: {cuidador.calificacion.toFixed(1)} ⭐<br />
                  Servicios:
                  {cuidador.servicios.map(servicio => (
                    <Badge key={servicio.idServicio} bg="info" className="me-1">
                      {servicio.descripcion}
                    </Badge>
                  ))}
                </Card.Text>
                <Link to={`/perfil-cuidador/${cuidador.idUsuario}`}>
                  <Button variant="primary">Ver Perfil</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaCuidadores;