import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Badge, Button, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import mockApiCuidador from '../../services/mockApiCuidador';
import { IPost } from '../../types';
import { FaCalendar, FaDollarSign, FaArrowLeft, FaTimes } from 'react-icons/fa';

const SolicitudesEnviadas: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<IPost[]>([]);
  const [showToast, setShowToast] = useState(false);
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

  const handleCancelarSolicitud = async (id: string) => {
    try {
      await mockApiCuidador.cancelarSolicitud(id);
      setSolicitudes(solicitudes.filter(solicitud => solicitud._id.toString() !== id));
      setShowToast(true);
    } catch (error) {
      console.error('Error canceling solicitud:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Mis Solicitudes Enviadas</h1>
      <Card>
        <Card.Body>
          <ListGroup variant="flush">
            {solicitudes.map(solicitud => (
              <ListGroup.Item key={solicitud._id.toString()} className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-bold">{solicitud.motivo}</div>
                  <FaCalendar className="me-2" />
                  {solicitud.fechaInicio.toLocaleDateString()} - {solicitud.fechaFin.toLocaleDateString()}<br />
                  <FaDollarSign className="me-2" />{solicitud.ofertaPago}<br />
                  Estado: <Badge bg={solicitud.estado === 'pendiente' ? 'warning' : 'success'}>{solicitud.estado}</Badge>
                </div>
                {solicitud.estado === 'pendiente' && (
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleCancelarSolicitud(solicitud._id.toString())}
                  >
                    <FaTimes /> Cancelar
                  </Button>
                )}
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

      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        delay={3000} 
        autohide
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Notificación</strong>
        </Toast.Header>
        <Toast.Body>Solicitud cancelada exitosamente</Toast.Body>
      </Toast>
    </Container>
  );
};

export default SolicitudesEnviadas;