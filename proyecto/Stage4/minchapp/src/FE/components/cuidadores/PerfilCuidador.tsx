import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, ListGroup, Form } from 'react-bootstrap';
import { Star, StarFill, GeoAlt, CashStack, Award } from 'react-bootstrap-icons';
import { Cuidador, Resena } from '../../types';

const PerfilCuidador: React.FC = () => {
  const [cuidador, setCuidador] = useState<Cuidador>({
    id: 1,
    nombre: 'Pamela',
    apellido: 'Morataya',
    fechaNacimiento: new Date('1990-01-01'),
    ciudadResidencia: 'San José, Costa Rica',
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
    descripcion: 'Amante de los animales con experiencia en cuidado de perros de todas las razas...',
    credenciales: ['Certificado en primeros auxilios para mascotas', 'Curso de entrenamiento canino'],
  });

  const [resenas, setResenas] = useState<Resena[]>([
    { id: 1, idUsuario: 2, idRecibReview: 1, calificacion: 5, comentario: 'Excelente cuidadora, muy atenta y cariñosa.', fechaCreado: new Date('2023-05-15') },
    { id: 2, idUsuario: 3, idRecibReview: 1, calificacion: 5, comentario: 'Mi perro la adoró. Muy recomendada.', fechaCreado: new Date('2023-05-10') },
  ]);

  const [nuevaResena, setNuevaResena] = useState({ comentario: '', calificacion: 5 });

  const handleSubmitResena = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaResenaCompleta: Resena = {
      id: resenas.length + 1,
      idUsuario: 4, // Logica para obtener el id del usuario que esta creando la reseña
      idRecibReview: cuidador.id,
      calificacion: nuevaResena.calificacion,
      comentario: nuevaResena.comentario,
      fechaCreado: new Date(),
    };
    setResenas([...resenas, nuevaResenaCompleta]);
    setNuevaResena({ comentario: '', calificacion: 5 });
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={cuidador.urlImagenPerfil} />
            <Card.Body>
              <Card.Title>{`${cuidador.nombre} ${cuidador.apellido}`}</Card.Title>
              <Card.Text>
                <StarFill className="text-warning" /> {cuidador.ratingReviews}/5
                <br />
                <Badge bg="info">{cuidador.especialidad}</Badge>
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item><GeoAlt /> {cuidador.ciudadResidencia}</ListGroup.Item>
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
          {resenas.map((resena) => (
            <Card key={resena.id} className="mb-3">
              <Card.Body>
                <Card.Title>{`Usuario ${resena.idUsuario}`} - {resena.fechaCreado.toLocaleDateString()}</Card.Title>
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