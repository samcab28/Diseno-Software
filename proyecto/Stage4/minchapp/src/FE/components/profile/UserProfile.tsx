import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { CareRequestList } from '../cuidadores/CareRequestList';
import { Header } from '../common/Header';
import { PublishCareNeed } from '../host/PublishCareNeed';

interface UserProfileProps {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, phone, address }) => {
  return (
    <Card>
      <Card.Header as="h5">Perfil de Usuario</Card.Header>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Email:</strong> {email}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Teléfono:</strong> {phone}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Dirección:</strong> {address}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export { Header, PublishCareNeed, CareRequestList, UserProfile };