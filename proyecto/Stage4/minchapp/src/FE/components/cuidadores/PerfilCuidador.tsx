import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge, Carousel, Modal } from 'react-bootstrap';
import { StarFill, Shield, Cash, Facebook, Instagram, Twitter, Linkedin, GeoAlt, Phone, Envelope, Award } from 'react-bootstrap-icons';
import { UsuarioRegistrado, RedSocial, DepositoGarantia, ServicioAdicional, BitacoraCuidados } from '../../types/index';
import ChatComponent from '../host/ChatComponent';

interface Credencial {
  id: number;
  idUsuario: number;
  titulo: string;
  descripcion: string;
  fechaObtencion: Date;
}

interface PerfilCuidadorProps {
  idCuidador: number;
}

const PerfilCuidador: React.FC<PerfilCuidadorProps> = ({ idCuidador }) => {
  const [cuidador, setCuidador] = useState<UsuarioRegistrado | null>(null);
  const [redesSociales, setRedesSociales] = useState<RedSocial[]>([]);
  const [depositos, setDepositos] = useState<DepositoGarantia[]>([]);
  const [servicios, setServicios] = useState<ServicioAdicional[]>([]);
  const [bitacoras, setBitacoras] = useState<BitacoraCuidados[]>([]);
  const [credenciales, setCredenciales] = useState<Credencial[]>([]);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [mediaItems] = useState([
    { type: 'image', src: 'https://example.com/image1.jpg', alt: 'Cuidando mascotas' },
    { type: 'video', src: 'https://example.com/video1.mp4', alt: 'Video presentación' },
    { type: 'image', src: 'https://example.com/image2.jpg', alt: 'Con un perro' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulación de llamadas a la API
      const cuidadorData: UsuarioRegistrado = {
        id: idCuidador,
        nombre: 'Juan',
        apellido: 'Pérez',
        fechaNacimiento: new Date('1990-01-01'),
        ciudadResidencia: 'San José',
        urlImagenPerfil: 'https://example.com/juan.jpg',
        telefono: '12345678',
        email: 'juan@example.com',
        contrasena: 'hashedpassword',
        cedula: '123456789',
        hojaDelincuencia: true,
        tarjetaCredito: '1234-5678-9012-3456',
        ratingReviews: 4.8,
        tipoUsuario: 'cuidador'
      };

      const redesSocialesData: RedSocial[] = [
        { id: 1, idUsuario: idCuidador, nombrePlataforma: 'Facebook', urlPerfil: 'https://facebook.com/juanperez' },
        { id: 2, idUsuario: idCuidador, nombrePlataforma: 'Instagram', urlPerfil: 'https://instagram.com/juanperez' }
      ];

      const depositosData: DepositoGarantia[] = [
        { id: 1, idUsuario: idCuidador, idRecibeDep: 0, monto: 100, motivo: 'Garantía de servicio' },
        { id: 2, idUsuario: idCuidador, idRecibeDep: 0, monto: 50, motivo: 'Depósito adicional' }
      ];

      const serviciosData: ServicioAdicional[] = [
        { id: 1, idUsuario: idCuidador, descripcion: 'Paseo de perros' },
        { id: 2, idUsuario: idCuidador, descripcion: 'Cuidado de gatos' },
        { id: 3, idUsuario: idCuidador, descripcion: 'Administración de medicamentos' }
      ];

      const bitacorasData: BitacoraCuidados[] = [
        { id: 1, idPost: 1, idCuidador: idCuidador, observaciones: 'Excelente cuidado de mascotas' },
        { id: 2, idPost: 2, idCuidador: idCuidador, observaciones: 'Muy puntual y responsable' }
      ];

      const credencialesData: Credencial[] = [
        { id: 1, idUsuario: idCuidador, titulo: 'Certificado en Primeros Auxilios para Mascotas', descripcion: 'Curso completo de primeros auxilios para perros y gatos', fechaObtencion: new Date('2022-05-15') },
        { id: 2, idUsuario: idCuidador, titulo: 'Especialista en Comportamiento Canino', descripcion: 'Certificación en manejo de conductas caninas', fechaObtencion: new Date('2021-11-20') }
      ];

      setCuidador(cuidadorData);
      setRedesSociales(redesSocialesData);
      setDepositos(depositosData);
      setServicios(serviciosData);
      setBitacoras(bitacorasData);
      setCredenciales(credencialesData);
    };

    fetchData();
  }, [idCuidador]);

  const getRedSocialIcon = (nombrePlataforma: string) => {
    switch (nombrePlataforma.toLowerCase()) {
      case 'facebook':
        return <Facebook className="me-2" />;
      case 'instagram':
        return <Instagram className="me-2" />;
      case 'twitter':
        return <Twitter className="me-2" />;
      case 'linkedin':
        return <Linkedin className="me-2" />;
      default:
        return null;
    }
  };

  if (!cuidador) {
    return <div>Cargando...</div>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={cuidador.urlImagenPerfil} />
            <Card.Body>
              <Card.Title>{`${cuidador.nombre} ${cuidador.apellido}`}</Card.Title>
              <Card.Text>
                <StarFill className="text-warning" /> {cuidador.ratingReviews.toFixed(1)}
                <br />
                <Shield className="text-success" /> Verificado
                <br />
                <GeoAlt /> {cuidador.ciudadResidencia}
              </Card.Text>
              <Button variant="primary" onClick={() => setShowMediaModal(true)}>Ver Fotos y Videos</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h2>Información del Cuidador</h2>
          <p><Envelope /> Email: {cuidador.email}</p>
          <p><Phone /> Teléfono: {cuidador.telefono}</p>

          <h3>Redes Sociales</h3>
          <ListGroup className="mb-3">
            {redesSociales.map(red => (
              <ListGroup.Item key={red.id} className="d-flex align-items-center">
                {getRedSocialIcon(red.nombrePlataforma)}
                <a href={red.urlPerfil} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  {red.nombrePlataforma}
                </a>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h3>Depósitos de Garantía</h3>
          {depositos.map(deposito => (
            <Card key={deposito.id} className="mb-2">
              <Card.Body>
                <Card.Title><Cash /> ${deposito.monto}</Card.Title>
                <Card.Text>{deposito.motivo}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <h3>Servicios Adicionales</h3>
          <ListGroup className="mb-3">
            {servicios.map(servicio => (
              <ListGroup.Item key={servicio.id}>{servicio.descripcion}</ListGroup.Item>
            ))}
          </ListGroup>

          <h3>Credenciales y Calificaciones</h3>
          {credenciales.map(credencial => (
            <Card key={credencial.id} className="mb-2">
              <Card.Body>
                <Card.Title><Award className="me-2" />{credencial.titulo}</Card.Title>
                <Card.Text>{credencial.descripcion}</Card.Text>
                <Card.Text><small className="text-muted">Obtenido el: {credencial.fechaObtencion.toLocaleDateString()}</small></Card.Text>
              </Card.Body>
            </Card>
          ))}

          <h3>Bitácora de Cuidados</h3>
          {bitacoras.map(bitacora => (
            <Card key={bitacora.id} className="mb-2">
              <Card.Body>
                <Card.Text>{bitacora.observaciones}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <Button variant="primary" className="mt-3 me-2" onClick={() => setShowChat(!showChat)}>
            {showChat ? 'Cerrar Chat' : 'Abrir Chat'}
          </Button>
          <Button variant="outline-primary" className="mt-3">Contactar Cuidador</Button>
        </Col>
      </Row>

      {showChat && (
        <Row className="mt-4">
          <Col>
            <ChatComponent hostId={1} cuidadorId={idCuidador} />
          </Col>
        </Row>
      )}

      <Modal show={showMediaModal} onHide={() => setShowMediaModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Fotos y Videos de {cuidador.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {mediaItems.map((item, index) => (
              <Carousel.Item key={index}>
                {item.type === 'image' ? (
                  <img
                    className="d-block w-100"
                    src={item.src}
                    alt={item.alt}
                  />
                ) : (
                  <video className="d-block w-100" controls>
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <Carousel.Caption>
                  <p>{item.alt}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PerfilCuidador;