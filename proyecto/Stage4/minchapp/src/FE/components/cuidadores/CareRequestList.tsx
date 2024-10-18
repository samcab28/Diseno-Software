import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container, Image } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

interface Cuidador {
  id: number;
  nombre: string;
  apellido: string;
  fotoPerfil: string;
  calificacion: number;
  experiencia: string;
  introduccion: string;
}

interface SolicitudCuidado {
  id: number;
  cuidador: Cuidador;
  fechaSolicitud: Date;
  estadoSolicitud: 'pendiente' | 'aceptada' | 'rechazada';
}

const CareRequestList: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudCuidado[]>([]);

  useEffect(() => {
    // Lógica o llamada a la API
    const fetchSolicitudes = async () => {
      const response = await new Promise<SolicitudCuidado[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              cuidador: {
                id: 101,
                nombre: "Ana",
                apellido: "García",
                fotoPerfil: "https://example.com/ana.jpg",
                calificacion: 4.8,
                experiencia: "3 años",
                introduccion: "Amante de los animales con experiencia en cuidado de perros y gatos."
              },
              fechaSolicitud: new Date('2023-07-10'),
              estadoSolicitud: 'pendiente'
            },
            {
              id: 2,
              cuidador: {
                id: 102,
                nombre: "Carlos",
                apellido: "Rodríguez",
                fotoPerfil: "https://example.com/carlos.jpg",
                calificacion: 4.5,
                experiencia: "2 años",
                introduccion: "Estudiante de veterinaria con pasión por el cuidado de mascotas."
              },
              fechaSolicitud: new Date('2023-07-11'),
              estadoSolicitud: 'pendiente'
            },
            {
              id: 3,
              cuidador: {
                id: 103,
                nombre: "Laura",
                apellido: "Martínez",
                fotoPerfil: "https://example.com/laura.jpg",
                calificacion: 4.9,
                experiencia: "5 años",
                introduccion: "Profesional certificada en cuidado de mascotas y mantenimiento del hogar."
              },
              fechaSolicitud: new Date('2023-07-12'),
              estadoSolicitud: 'pendiente'
            }
          ]);
        }, 1000); // Simula un retraso de 1 segundo
      });
      setSolicitudes(response);
    };

    fetchSolicitudes();
  }, []);

  const handleAceptar = (id: number) => {
    // Lógica de aceptar la solicitud
    console.log(`Solicitud ${id} aceptada`);
  };

  const handleRechazar = (id: number) => {
    // Lógica de rechazar la solicitud
    console.log(`Solicitud ${id} rechazada`);
  };

  return (
    <Container>
      <h2 className="my-4">Solicitudes de Cuidadores Interesados</h2>
      <Row>
        {solicitudes.map((solicitud) => (
          <Col key={solicitud.id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Image src={solicitud.cuidador.fotoPerfil} roundedCircle width="60" height="60" className="me-3" />
                  <div>
                    <Card.Title>{`${solicitud.cuidador.nombre} ${solicitud.cuidador.apellido}`}</Card.Title>
                    <div>
                      <StarFill className="text-warning" />
                      <span className="ms-1">{solicitud.cuidador.calificacion.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <Card.Text>
                  <strong>Experiencia:</strong> {solicitud.cuidador.experiencia}
                </Card.Text>
                <Card.Text>{solicitud.cuidador.introduccion}</Card.Text>
                <Card.Text>
                  <small className="text-muted">Solicitud recibida: {solicitud.fechaSolicitud.toLocaleDateString()}</small>
                </Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <Link to={`/perfil-cuidador/${solicitud.cuidador.id}`}>
                    <Button variant="info">
                      Ver Perfil
                    </Button>
                  </Link>
                  <Button variant="success" onClick={() => handleAceptar(solicitud.id)}>Aceptar</Button>
                  <Button variant="outline-danger" onClick={() => handleRechazar(solicitud.id)}>Rechazar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CareRequestList;