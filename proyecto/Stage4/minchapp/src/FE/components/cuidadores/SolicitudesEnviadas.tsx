import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import mockApiCuidador from '../../services/mockApiCuidador';
import { IPost } from '../../types';
import { FaCalendar, FaDollarSign, FaArrowLeft } from 'react-icons/fa';

const SolicitudesEnviadas: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<IPost[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (token) {
        try {
          const data = await mockApiCuidador.getSolicitudesEnviadas();
          setSolicitudes(data);
        } catch (error) {
          console.error('Error fetching solicitudes:', error);
        }
      }
    };

    fetchSolicitudes();
  }, [token]);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Mis Solicitudes Enviadas</h1>
      <Card>
        <Card.Body>
          <ListGroup variant="flush">
            {solicitudes.map(solicitud => (
              <ListGroup.Item key={solicitud._id.toString()}>
                <div className="fw-bold">{solicitud.motivo}</div>
                <FaCalendar className="me-2" />
                {solicitud.fechaInicio.toLocaleDateString()} - {solicitud.fechaFin.toLocaleDateString()}<br />
                <FaDollarSign className="me-2" />{solicitud.ofertaPago}<br />
                Estado: <Badge bg={solicitud.estado === 'pendiente' ? 'warning' : 'success'}>{solicitud.estado}</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <Link to="/cuidador-dashboard" className="d-inline-block mt-3">
        <Button variant="secondary">
          <FaArrowLeft className="me-2" />Volver al Dashboard
        </Button>
      </Link>
    </Container>
  );
};

export default SolicitudesEnviadas;