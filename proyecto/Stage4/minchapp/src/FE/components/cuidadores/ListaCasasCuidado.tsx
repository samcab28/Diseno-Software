import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Badge, Toast } from 'react-bootstrap';
import { Calendar, GeoAlt, Cash, Heart, HeartFill, Chat } from 'react-bootstrap-icons';
import { Post, InfoCasa } from '../../types/index';

interface NecesidadCuidado extends Post {
  infoCasa: InfoCasa;
  liked?: boolean;
  matched?: boolean;
}

const ListaCasasCuidado: React.FC = () => {
  const [necesidades, setNecesidades] = useState<NecesidadCuidado[]>([]);
  const [showMatchToast, setShowMatchToast] = useState(false);
  const [matchedNecesidad, setMatchedNecesidad] = useState<NecesidadCuidado | null>(null);

  useEffect(() => {
    // Logica para obtener la info 
    const necesidadesEjemplo: NecesidadCuidado[] = [
      {
        id: 1,
        idUsuario: 1,
        motivo: "Viaje de negocios",
        idInfoBasica: 1,
        ofertaPago: 50,
        fechaInicio: new Date("2023-07-01"),
        fechaFin: new Date("2023-07-10"),
        subJsonPagos: {},
        estadoReservado: false,
        infoCasa: {
          id: 1,
          idUsuario: 1,
          idDireccion: 1,
          descripcionBase: "Casa amplia con jardín",
          numHabitaciones: 3,
          numBanos: 2,
          descripcionCuidados: "Cuidado de dos perros y regar plantas",
          piscina: false,
          jardin: true,
          mascotas: true
        },
        liked: false,
        matched: false
      },
    ];
    setNecesidades(necesidadesEjemplo);
  }, []);

  const handleLike = (index: number) => {
    const updatedNecesidades = [...necesidades];
    updatedNecesidades[index].liked = !updatedNecesidades[index].liked;
    
    // Simulamos un match con una probabilidad del 50%
    if (updatedNecesidades[index].liked && Math.random() > 0.5) {
      updatedNecesidades[index].matched = true;
      setMatchedNecesidad(updatedNecesidades[index]);
      setShowMatchToast(true);
    }
    
    setNecesidades(updatedNecesidades);
  };

  return (
    <Container className="my-4">
      <h2>Necesidades de Cuidado Disponibles</h2>
      <Row>
        {necesidades.map((necesidad, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{necesidad.motivo}</Card.Title>
                <Card.Text>
                  <GeoAlt /> {necesidad.infoCasa.descripcionBase}
                  <br />
                  <Calendar /> {necesidad.fechaInicio.toLocaleDateString()} - {necesidad.fechaFin.toLocaleDateString()}
                  <br />
                  <Cash /> ${necesidad.ofertaPago}/día
                </Card.Text>
                <h6>Detalles de la casa:</h6>
                <p>
                  Habitaciones: {necesidad.infoCasa.numHabitaciones}, 
                  Baños: {necesidad.infoCasa.numBanos}
                </p>
                <p>{necesidad.infoCasa.descripcionCuidados}</p>
                {necesidad.infoCasa.piscina && <Badge bg="info" className="me-1">Piscina</Badge>}
                {necesidad.infoCasa.jardin && <Badge bg="success" className="me-1">Jardín</Badge>}
                {necesidad.infoCasa.mascotas && <Badge bg="warning">Mascotas</Badge>}
                <div className="mt-3 d-flex justify-content-between">
                  <Button 
                    variant={necesidad.liked ? "danger" : "outline-danger"} 
                    onClick={() => handleLike(index)}
                  >
                    {necesidad.liked ? <HeartFill /> : <Heart />} Me interesa
                  </Button>
                  {necesidad.matched && (
                    <Button variant="success">
                      <Chat /> Chatear
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

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
          Has hecho match con la necesidad de cuidado: "{matchedNecesidad?.motivo}". 
          ¡Puedes comenzar a chatear!
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default ListaCasasCuidado;