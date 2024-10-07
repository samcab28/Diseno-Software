import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const PublishCareNeed: React.FC = () => {
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para publicar la necesidad de cuidado
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Publicar necesidad de cuidado</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              placeholder="Describe las necesidades de cuidado de tu mascota"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de fin</Form.Label>
            <Form.Control 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Publicar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export { PublishCareNeed };