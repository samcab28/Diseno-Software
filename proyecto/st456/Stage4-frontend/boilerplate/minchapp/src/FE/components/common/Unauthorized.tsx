import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Acceso No Autorizado</Alert.Heading>
        <p>
          Lo sentimos, no tienes permiso para acceder a esta página. Si crees que esto es un error,
          por favor contacta al administrador del sistema.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => navigate('/')} variant="outline-danger">
            Volver al Inicio
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default Unauthorized;