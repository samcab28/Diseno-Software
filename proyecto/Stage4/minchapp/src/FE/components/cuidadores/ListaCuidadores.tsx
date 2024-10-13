import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Toast, Pagination } from 'react-bootstrap';
import { GeoAlt, StarFill, CurrencyDollar, Heart, HeartFill, Chat } from 'react-bootstrap-icons';
import { Usuario, UsuarioRegistrado, Favorito, ServicioAdicional } from '../../types/index';

interface CuidadorConFavorito extends UsuarioRegistrado {
  servicios: ServicioAdicional[];
  liked: boolean;
  matched: boolean;
  distancia?: number;
  latitud: number;
  longitud: number;
}

const ListaCuidadores: React.FC = () => {
  const [cuidadores, setCuidadores] = useState<CuidadorConFavorito[]>([]);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');
  const [filtroPrecio, setFiltroPrecio] = useState('');
  const [showMatchToast, setShowMatchToast] = useState(false);
  const [matchedCuidador, setMatchedCuidador] = useState<CuidadorConFavorito | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cuidadoresPorPagina] = useState(8);
  const [ubicacionUsuario, setUbicacionUsuario] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    const fetchCuidadores = async () => {
      // Simulación de datos de cuidadores
      const cuidadoresMock: CuidadorConFavorito[] = [
        {
          id: 1,
          nombre: 'Pamela',
          apellido: 'Morataya',
          fechaNacimiento: new Date('1990-01-01'),
          ciudadResidencia: 'San José',
          urlImagenPerfil: '/img/pamela.jpg',
          telefono: '12345678',
          email: 'pamela@example.com',
          contrasena: 'hashedpassword',
          cedula: '123456789',
          hojaDelincuencia: true,
          tarjetaCredito: '1234-5678-9012-3456',
          ratingReviews: 4.8,
          tipoUsuario: 'cuidador',
          servicios: [{ id: 1, idUsuario: 1, descripcion: 'Cuidado de perros' }],
          liked: false,
          matched: false,
          latitud: 9.9281,
          longitud: -84.0907
        },
        {
          id: 2,
          nombre: 'Juan',
          apellido: 'Pérez',
          fechaNacimiento: new Date('1985-05-15'),
          ciudadResidencia: 'Cartago',
          urlImagenPerfil: '/img/juan.jpg',
          telefono: '87654321',
          email: 'juan@example.com',
          contrasena: 'hashedpassword',
          cedula: '987654321',
          hojaDelincuencia: true,
          tarjetaCredito: '6543-2109-8765-4321',
          ratingReviews: 4.5,
          tipoUsuario: 'cuidador',
          servicios: [{ id: 2, idUsuario: 2, descripcion: 'Cuidado de gatos' }],
          liked: false,
          matched: false,
          latitud: 9.8638,
          longitud: -83.9196
        }
      ];
      setCuidadores(cuidadoresMock);
    };

    fetchCuidadores();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUbicacionUsuario(position.coords);
        },
        (error) => {
          console.error("Error obteniendo la ubicación: ", error);
        }
      );
    }
  }, []);

  const filtrarCuidadores = () => {
    return cuidadores.filter(cuidador => 
      (!filtroEspecialidad || cuidador.servicios.some(s => s.descripcion.toLowerCase().includes(filtroEspecialidad.toLowerCase()))) &&
      (!filtroPrecio || cuidador.ratingReviews <= parseInt(filtroPrecio))
    );
  };

  const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distancia en km
    return d;
  };

  const cuidadoresFiltrados = filtrarCuidadores();

  if (ubicacionUsuario) {
    cuidadoresFiltrados.forEach(cuidador => {
      cuidador.distancia = calcularDistancia(
        ubicacionUsuario.latitude,
        ubicacionUsuario.longitude,
        cuidador.latitud,
        cuidador.longitud
      );
    });

    cuidadoresFiltrados.sort((a, b) => (a.distancia || 0) - (b.distancia || 0));
  }

  const indexOfLastCuidador = currentPage * cuidadoresPorPagina;
  const indexOfFirstCuidador = indexOfLastCuidador - cuidadoresPorPagina;
  const currentCuidadores = cuidadoresFiltrados.slice(indexOfFirstCuidador, indexOfLastCuidador);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleLike = async (cuidadorId: number) => {
    const updatedCuidadores = cuidadores.map(c => 
      c.id === cuidadorId ? { ...c, liked: !c.liked } : c
    );
    
    if (Math.random() > 0.5) {
      const matchedCuidador = updatedCuidadores.find(c => c.id === cuidadorId);
      if (matchedCuidador) {
        matchedCuidador.matched = true;
        setMatchedCuidador(matchedCuidador);
        setShowMatchToast(true);
      }
    }
    
    setCuidadores(updatedCuidadores);
  };

  return (
    <Container fluid className="py-4 bg-light">
      <h2 className="text-center mb-4">Encuentra tu cuidador ideal</h2>
      
      <Row className="justify-content-center mb-4">
        <Col md={4} lg={3}>
          <Form.Select 
            value={filtroEspecialidad} 
            onChange={(e) => setFiltroEspecialidad(e.target.value)}
            className="mb-2"
          >
            <option value="">Todos los servicios</option>
            <option value="perro">🐶 Perros</option>
            <option value="gato">🐱 Gatos</option>
            <option value="ave">🦜 Aves</option>
          </Form.Select>
        </Col>
        <Col md={4} lg={3}>
          <Form.Select 
            value={filtroPrecio} 
            onChange={(e) => setFiltroPrecio(e.target.value)}
            className="mb-2"
          >
            <option value="">Cualquier calificación</option>
            <option value="4">4 estrellas o más</option>
            <option value="4.5">4.5 estrellas o más</option>
            <option value="5">5 estrellas</option>
          </Form.Select>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        {currentCuidadores.map((cuidador) => (
          <Col key={cuidador.id} md={6} lg={4} xl={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={cuidador.urlImagenPerfil} />
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {`${cuidador.nombre} ${cuidador.apellido}`}
                  <Badge bg="info" className="ms-2">
                    {cuidador.servicios[0].descripcion.includes('perro') ? '🐶' : 
                     cuidador.servicios[0].descripcion.includes('gato') ? '🐱' : 
                     cuidador.servicios[0].descripcion.includes('ave') ? '🦜' : '🐾'}
                  </Badge>
                </Card.Title>
                <Card.Text>
                  <StarFill className="text-warning me-1" />{cuidador.ratingReviews.toFixed(1)}
                  <br />
                  <GeoAlt className="me-1" />{cuidador.ciudadResidencia}
                  {cuidador.distancia !== undefined && (
                    <span> ({cuidador.distancia.toFixed(2)} km)</span>
                  )}
                  <br />
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button 
                    variant={cuidador.liked ? "danger" : "outline-danger"} 
                    onClick={() => handleLike(cuidador.id)}
                  >
                    {cuidador.liked ? <HeartFill /> : <Heart />} Me interesa
                  </Button>
                  <Button variant="primary">Ver perfil</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center mt-4">
        {[...Array(Math.ceil(cuidadoresFiltrados.length / cuidadoresPorPagina))].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Toast 
        show={showMatchToast} 
        onClose={() => setShowMatchToast(false)}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          minWidth: '250px'
        }}
      >
        <Toast.Header>
          <strong className="me-auto">¡Nuevo Match!</strong>
        </Toast.Header>
        <Toast.Body>
          Has hecho match con {matchedCuidador?.nombre} {matchedCuidador?.apellido}. 
          ¡Puedes comenzar a chatear!
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default ListaCuidadores;