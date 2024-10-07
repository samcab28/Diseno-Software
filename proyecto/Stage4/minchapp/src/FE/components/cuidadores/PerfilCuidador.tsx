import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, ListGroup, Form } from 'react-bootstrap';
import { Star, StarFill, GeoAlt, CashStack, Award } from 'react-bootstrap-icons';

interface Resena {
  id: string;
  autor: string;
  comentario: string;
  calificacion: number;
  fecha: string;
}

interface Cuidador {
  id: string;
  nombre: string;
  foto: string;
  calificacion: number;
  especialidad: string;
  experiencia: string;
  tarifa: number;
  ubicacion: string;
  descripcion: string;
  credenciales: string[];
  resenas: Resena[];
}

const PerfilCuidador: React.FC = () => {
  const [cuidador, setCuidador] = useState<Cuidador>({
    id: '1',
    nombre: 'Pamela Morataya',
    foto: '/img/pamela.jpg',
    calificacion: 4.8,
    especialidad: 'Perros',
    experiencia: '5 años',
    tarifa: 20,
    ubicacion: 'San José, Costa Rica',
    descripcion: 'Amante de los animales con experiencia en cuidado de perros de todas las razas...',
    credenciales: ['Certificado en primeros auxilios para mascotas', 'Curso de entrenamiento canino'],
    resenas: [
      { id: '1', autor: 'Juan P.', comentario: 'Excelente cuidadora, muy atenta y cariñosa.', calificacion: 5, fecha: '2023-05-15' },
      { id: '2', autor: 'María L.', comentario: 'Mi perro la adoró. Muy recomendada.', calificacion: 5, fecha: '2023-05-10' },
    ],
  });

  const [nuevaResena, setNuevaResena] = useState({ comentario: '', calificacion: 5 });

  const handleSubmitResena = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaResenaCompleta: Resena = {
      id: Date.now().toString(),
      autor: 'Usuario Actual', // TODO: Falta la logica para el usuario actual
      comentario: nuevaResena.comentario,
      calificacion: nuevaResena.calificacion,
      fecha: new Date().toISOString().split('T')[0],
    };
    setCuidador(prevCuidador => ({
      ...prevCuidador,
      resenas: [...prevCuidador.resenas, nuevaResenaCompleta],
    }));
    setNuevaResena({ comentario: '', calificacion: 5 });
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={cuidador.foto} />
            <Card.Body>
              <Card.Title>{cuidador.nombre}</Card.Title>
              <Card.Text>
                <StarFill className="text-warning" /> {cuidador.calificacion}/5
                <br />
                <Badge bg="info">{cuidador.especialidad}</Badge>
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item><GeoAlt /> {cuidador.ubicacion}</ListGroup.Item>
                <ListGroup.Item><CashStack /> ${cuidador.tarifa}/hora</ListGroup.Item>
                <ListGroup.Item><Award /> {cuidador.experiencia} de experiencia</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h2>Sobre mí</h2>
          <p>{cuidador.descripcion}</p>
          <h3>Credenciales</h3>
          <ul>
            {cuidador.credenciales.map((credencial, index) => (
              <li key={index}>{credencial}</li>
            ))}
          </ul>
          <h3>Reseñas</h3>
          {cuidador.resenas.map((resena) => (
            <Card key={resena.id} className="mb-3">
              <Card.Body>
                <Card.Title>{resena.autor} - {resena.fecha}</Card.Title>
                <Card.Text>
                  {[...Array(5)].map((_, i) => 
                    i < resena.calificacion ? <StarFill key={i} className="text-warning" /> : <Star key={i} className="text-warning" />
                  )}
                  <br />
                  {resena.comentario}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          <h4>Deja tu reseña</h4>
          <Form onSubmit={handleSubmitResena}>
            <Form.Group className="mb-3">
              <Form.Label>Calificación</Form.Label>
              <Form.Select 
                value={nuevaResena.calificacion} 
                onChange={(e) => setNuevaResena({...nuevaResena, calificacion: parseInt(e.target.value)})}
              >
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={nuevaResena.comentario}
                onChange={(e) => setNuevaResena({...nuevaResena, comentario: e.target.value})}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar Reseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PerfilCuidador;