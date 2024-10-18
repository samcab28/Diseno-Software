import React from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';
import { UsuarioRegistrado } from '../../types/index';

interface UserProfileProps {
  user: UsuarioRegistrado;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Container className="my-4">
      <Card>
        <Card.Img variant="top" src={user.urlImagenPerfil} />
        <Card.Body>
          <Card.Title>{`${user.nombre} ${user.apellido}`}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
            <ListGroup.Item>Teléfono: {user.telefono}</ListGroup.Item>
            <ListGroup.Item>Ciudad: {user.ciudadResidencia}</ListGroup.Item>
            <ListGroup.Item>Tipo de Usuario: {user.tipoUsuario}</ListGroup.Item>
            <ListGroup.Item>Calificación: {user.ratingReviews}</ListGroup.Item>
            <ListGroup.Item>Hoja de Delincuencia: {user.hojaDelincuencia ? 'Verificada' : 'No verificada'}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;