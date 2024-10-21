import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Usuario, IPost, Favoritos, SolicitudCuidador } from '../../types';
import mockApiHost from '../../services/mockApiHost';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaDollarSign, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/DashboardHost.css';

const DashboardHost: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [host, setHost] = useState<Usuario | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [favoritos, setFavoritos] = useState<Favoritos[]>([]);
  const [solicitudes, setSolicitudes] = useState<SolicitudCuidador[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const hostData = await mockApiHost.getHost(token.jwtToken);
          setHost(hostData);

          const userId = hostData.idUsuario;
          const postsData = await mockApiHost.getPosts(userId);
          setPosts(postsData);

          const favoritosData = await mockApiHost.getFavoritos(userId);
          setFavoritos(favoritosData);

          const solicitudesData = await mockApiHost.getSolicitudes(userId);
          setSolicitudes(solicitudesData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container className="mt-4 dashboard-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard del Host</h1>
        <Button variant="outline-danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />Cerrar Sesión
        </Button>
      </div>
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Img variant="top" src={host?.urlImagenPerfil} />
            <Card.Body>
              <Card.Title><FaUser className="me-2" />{`${host?.nombre} ${host?.apellido1}`}</Card.Title>
              <Card.Text>
                <FaEnvelope className="me-2" /> {host?.email}<br />
                <FaPhone className="me-2" /> {host?.telefono}
              </Card.Text>
            </Card.Body>
          </Card>
          <Link to="/publicar-necesidad" className="d-grid gap-2 mb-4">
            <Button variant="primary" size="lg">
              <FaPlus className="me-2" />Crear Nueva Publicación
            </Button>
          </Link>
        </Col>
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Publicaciones Activas</Card.Title>
              <ListGroup variant="flush">
                {posts.map(post => (
                  <ListGroup.Item key={post._id.toString()} className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{post.motivo}</div>
                      <FaCalendar className="me-2" />
                      {post.fechaInicio.toLocaleDateString()} - {post.fechaFin.toLocaleDateString()}<br />
                      <FaDollarSign className="me-2" />{post.ofertaPago}<br />
                      Estado: <Badge bg={post.estado === 'pendiente' ? 'warning' : 'success'}>{post.estado}</Badge>
                    </div>
                    <Link to={`/notificaciones-cuidadores/${post._id.toString()}`}>
                      <Button variant="primary" size="sm">Ver Cuidadores Interesados</Button>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Solicitudes Pendientes</Card.Title>
              <ListGroup variant="flush">
                {solicitudes.map(solicitud => (
                  <ListGroup.Item key={solicitud.idSolicitud} className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Solicitud de Cuidador ID: {solicitud.idCuidador}</div>
                      Estado: <Badge bg={solicitud.estado === 'pendiente' ? 'warning' : 'success'}>{solicitud.estado}</Badge>
                    </div>
                    <Link to={`/perfil-cuidador/${solicitud.idCuidador}`}>
                      <Button variant="info" size="sm">Ver Perfil</Button>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Cuidadores Favoritos</Card.Title>
              <ListGroup variant="flush">
                {favoritos.map(favorito => (
                  <ListGroup.Item key={favorito.idFavorito} className="d-flex justify-content-between align-items-center">
                    <div>Cuidador ID: {favorito.idCuidador}</div>
                    <Link to={`/perfil-cuidador/${favorito.idCuidador}`}>
                      <Button variant="info" size="sm">Ver Perfil</Button>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardHost;