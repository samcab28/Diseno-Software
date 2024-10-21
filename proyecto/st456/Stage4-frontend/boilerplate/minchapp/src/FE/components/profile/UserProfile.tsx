import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Usuario, TipoUsuario, IPost, ServicioAdicional } from '../../types';

interface UserProfileProps {
  user: Usuario & {
    tipoUsuario: TipoUsuario;
    posts?: IPost[];
    servicios?: ServicioAdicional[];
    calificacion?: number;
  };
}

const UserProfile: React.FC<UserProfileProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserProfileProps['user'] | null>(null);
  const [interesExpresado, setInteresExpresado] = useState(false);

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener los datos del usuario
    // Por ahora, usaremos datos de ejemplo
    const fetchUser = async () => {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: UserProfileProps['user'] = {
        idUsuario: parseInt(id || '0'),
        nombre: 'Juan',
        apellido1: 'Pérez',
        apellido2: 'García',
        fechaNacimiento: new Date('1990-05-15'),
        urlImagenPerfil: 'https://example.com/juan.jpg',
        telefono: '123456789',
        email: 'juan@example.com',
        contrasena: '',
        idDireccion: 1,
        tipoUsuario: { idTipoUsuario: 1, descripcion: 'cuidador' },
        calificacion: 4.8,
        servicios: [
          { idServicio: 1, idUsuario: 1, descripcion: 'Cuidado de perros', deleted: false },
          { idServicio: 2, idUsuario: 1, descripcion: 'Cuidado de gatos', deleted: false }
        ],
        posts: [
          {
            _id: '1',
            idUsuario: 1,
            motivo: 'Cuidado de casa durante vacaciones',
            idInfoCasa: '1',
            ofertaPago: 500,
            fechaInicio: new Date('2023-12-01'),
            fechaFin: new Date('2023-12-15'),
            estado: 'pendiente',
            fechaPublicacion: new Date('2023-11-01'),
            deleted: false
          }
        ]
      };

      setUser(mockUser);
    };

    fetchUser();
  }, [id]);

  const handleExpresarInteres = () => {
    // Aquí normalmente enviarías una solicitud al backend para expresar interés
    console.log(`Interés expresado en el usuario ${id}`);
    setInteresExpresado(true);
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={user.urlImagenPerfil} />
            <Card.Body>
              <Card.Title>{`${user.nombre} ${user.apellido1} ${user.apellido2}`}</Card.Title>
              <Card.Text>
                <strong>Tipo de Usuario:</strong> {user.tipoUsuario.descripcion}<br />
                <strong>Email:</strong> {user.email}<br />
                <strong>Teléfono:</strong> {user.telefono}<br />
                {user.calificacion && (
                  <>
                    <strong>Calificación:</strong> {user.calificacion.toFixed(1)} ⭐<br />
                  </>
                )}
              </Card.Text>
              {user.tipoUsuario.descripcion === 'cuidador' && !interesExpresado && (
                <Button variant="primary" onClick={handleExpresarInteres}>Expresar Interés</Button>
              )}
              {interesExpresado && (
                <Button variant="success" disabled>Interés Expresado</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          {user.tipoUsuario.descripcion === 'cuidador' && user.servicios && (
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Servicios Ofrecidos</Card.Title>
                <ListGroup variant="flush">
                  {user.servicios.map(servicio => (
                    <ListGroup.Item key={servicio.idServicio}>
                      {servicio.descripcion}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
          {user.tipoUsuario.descripcion === 'host' && user.posts && (
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Publicaciones Activas</Card.Title>
                <ListGroup variant="flush">
                  {user.posts.map(post => (
                    <ListGroup.Item key={post._id.toString()}>
                      <strong>{post.motivo}</strong><br />
                      Fecha: {post.fechaInicio.toLocaleDateString()} - {post.fechaFin.toLocaleDateString()}<br />
                      Oferta: ${post.ofertaPago}<br />
                      Estado: <Badge bg={post.estado === 'pendiente' ? 'warning' : 'success'}>{post.estado}</Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
          <Card>
            <Card.Body>
              <Card.Title>Acciones</Card.Title>
              <Link to={`/chat/${user.idUsuario}`}>
                <Button variant="primary" className="me-2">Iniciar Conversación</Button>
              </Link>
              <Link to={`/reviews/${user.idUsuario}`}>
                <Button variant="info">Ver Reseñas</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;