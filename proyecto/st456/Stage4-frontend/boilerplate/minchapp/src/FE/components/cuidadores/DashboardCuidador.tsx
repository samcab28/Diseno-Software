import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Usuario, IPost, ServicioAdicional } from '../../types';
import mockApiCuidador from '../../services/mockApiCuidador';
import { FaUser, FaEnvelope, FaPhone, FaDog, FaCat, FaCalendar, FaDollarSign, FaSearch, FaList, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/DashboardCuidador.css';

const DashboardCuidador: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [cuidador, setCuidador] = useState<Usuario | null>(null);
  const [oportunidades, setOportunidades] = useState<IPost[]>([]);
  const [servicios, setServicios] = useState<ServicioAdicional[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const cuidadorData = await mockApiCuidador.getCuidadorData(token?.payload?.email ?? '');
        setCuidador(cuidadorData);
  
        const oportunidadesData = await mockApiCuidador.getOportunidades();
        setOportunidades(oportunidadesData);
  
        const serviciosData = await mockApiCuidador.getServicios();
        setServicios(serviciosData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
  
    fetchDashboardData();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container className="mt-4 dashboard-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard del Cuidador</h1>
        <Button variant="outline-danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />Cerrar Sesión
        </Button>
      </div>
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Img variant="top" src={cuidador?.urlImagenPerfil} />
            <Card.Body>
              <Card.Title><FaUser className="me-2" />{`${cuidador?.nombre} ${cuidador?.apellido1}`}</Card.Title>
              <Card.Text>
                <FaEnvelope className="me-2" /> {cuidador?.email}<br />
                <FaPhone className="me-2" /> {cuidador?.telefono}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Mis Servicios</Card.Title>
              <ListGroup variant="flush">
                {servicios.map(servicio => (
                  <ListGroup.Item key={servicio.idServicio}>
                    {servicio.descripcion.toLowerCase().includes('perro') ? <FaDog className="me-2" /> : <FaCat className="me-2" />}
                    {servicio.descripcion}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Link to="/solicitudes-enviadas" className="d-grid gap-2 mb-4">
            <Button variant="info" size="lg">
              <FaList className="me-2" />Ver Mis Solicitudes Enviadas
            </Button>
          </Link>
        </Col>
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Oportunidades de Cuidado</Card.Title>
              <ListGroup variant="flush">
                {oportunidades.map(oportunidad => (
                  <ListGroup.Item key={oportunidad._id.toString()} className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{oportunidad.motivo}</div>
                      <FaCalendar className="me-2" />
                      {oportunidad.fechaInicio.toLocaleDateString()} - {oportunidad.fechaFin.toLocaleDateString()}<br />
                      <FaDollarSign className="me-2" />{oportunidad.ofertaPago}
                    </div>
                    <Link to={`/detalle-oportunidad/${oportunidad._id.toString()}`}>
                      <Button variant="primary" size="sm">Ver Detalles</Button>
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Link to="/buscar-oportunidades" className="d-grid gap-2">
            <Button variant="primary" size="lg">
              <FaSearch className="me-2" />Buscar Nuevas Oportunidades
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardCuidador;