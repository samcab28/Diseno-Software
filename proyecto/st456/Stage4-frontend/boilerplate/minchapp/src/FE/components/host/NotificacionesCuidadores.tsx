import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';

const NotificacionesCuidadores: React.FC = () => {
  const { notificaciones, handleAccept, handleReject } = useNotifications();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const onAccept = async (solicitudId: string) => {
    const message = await handleAccept(solicitudId);
    setToastMessage(message);
    setShowToast(true);
  };

  const onReject = async (solicitudId: string) => {
    const message = await handleReject(solicitudId);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleChatRedirect = (cuidadorId: string) => {
    navigate(`/chat/${cuidadorId}`);
  };

  return (
    <Container className="mt-4">
      <h2>Notificaciones de Cuidadores Interesados</h2>
      <Row>
        {notificaciones.map(({ notificacion, cuidador, post, solicitud }) => (
          <Col md={4} key={notificacion.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{`${cuidador.nombre} ${cuidador.apellido1}`}</Card.Title>
                <Card.Text>
                  Interesado en: {post.motivo}<br />
                  Fecha de solicitud: {post.fechaPublicacion.toLocaleDateString()}
                </Card.Text>
                <Link to={`/perfil-cuidador/${cuidador.idUsuario}`}>
                  <Button variant="info" className="me-2">Ver Perfil</Button>
                </Link>
                {solicitud.estado === 'pendiente' && (
                  <>
                    <Button 
                      variant="success" 
                      onClick={() => onAccept(solicitud.idSolicitud)}
                      className="me-2"
                    >
                      Aceptar
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => onReject(solicitud.idSolicitud)}
                    >
                      Rechazar
                    </Button>
                  </>
                )}
                {solicitud.estado === 'aceptado' && (
                  <Button 
                    variant="primary"
                    onClick={() => handleChatRedirect(cuidador.idUsuario.toString())}
                  >
                    Iniciar Chat
                  </Button>
                )}
                {solicitud.estado === 'rechazado' && (
                  <Button variant="outline-danger" disabled>Rechazado</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

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
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default NotificacionesCuidadores;