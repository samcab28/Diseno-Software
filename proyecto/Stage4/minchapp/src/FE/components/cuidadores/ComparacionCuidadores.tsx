import React, { useState, useEffect } from 'react';
import { Container, Table, Image, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { StarFill, InfoCircle } from 'react-bootstrap-icons';
import { UsuarioRegistrado, ServicioAdicional } from '../../types';

interface CuidadorConServicios extends UsuarioRegistrado {
  servicios: ServicioAdicional[];
  tarifaPorHora: number;
  experiencia: number; // en años
  disponibilidad: string[];
}

const ComparacionCuidadores: React.FC = () => {
  const [cuidadores, setCuidadores] = useState<CuidadorConServicios[]>([]);

  useEffect(() => {
    // Simular la carga de datos de cuidadores
    const fetchCuidadores = async () => {
      // En una aplicación real, esto sería una llamada a una API
      const cuidadoresMock: CuidadorConServicios[] = [
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
          servicios: [
            { id: 1, idUsuario: 1, descripcion: 'Cuidado de perros' },
            { id: 2, idUsuario: 1, descripcion: 'Paseos diarios' }
          ],
          tarifaPorHora: 15,
          experiencia: 5,
          disponibilidad: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
        },
        {
          id: 2,
          nombre: 'Carlos',
          apellido: 'Rodríguez',
          fechaNacimiento: new Date('1988-05-15'),
          ciudadResidencia: 'Alajuela',
          urlImagenPerfil: '/img/carlos.jpg',
          telefono: '87654321',
          email: 'carlos@example.com',
          contrasena: 'hashedpassword',
          cedula: '987654321',
          hojaDelincuencia: true,
          tarjetaCredito: '9876-5432-1098-7654',
          ratingReviews: 4.5,
          tipoUsuario: 'cuidador',
          servicios: [
            { id: 3, idUsuario: 2, descripcion: 'Cuidado de gatos' },
            { id: 4, idUsuario: 2, descripcion: 'Administración de medicamentos' }
          ],
          tarifaPorHora: 12,
          experiencia: 3,
          disponibilidad: ['Lunes', 'Miércoles', 'Viernes', 'Sábado', 'Domingo']
        }
      ];
      setCuidadores(cuidadoresMock);
    };

    fetchCuidadores();
  }, []);

  const renderTooltip = (content: string) => (
    <Tooltip id="button-tooltip">
      {content}
    </Tooltip>
  );

  return (
    <Container className="my-4">
      <h1 className="mb-4">Compara Cuidadores</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Cuidador</th>
            <th>Calificación</th>
            <th>Tarifa por Hora</th>
            <th>Experiencia</th>
            <th>Servicios</th>
            <th>Disponibilidad</th>
            <th>Ciudad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cuidadores.map(cuidador => (
            <tr key={cuidador.id}>
              <td>
                <Image src={cuidador.urlImagenPerfil} roundedCircle width="50" height="50" className="me-2" />
                {`${cuidador.nombre} ${cuidador.apellido}`}
              </td>
              <td>
                {cuidador.ratingReviews.toFixed(1)} <StarFill className="text-warning" />
              </td>
              <td>${cuidador.tarifaPorHora}/hora</td>
              <td>{cuidador.experiencia} años</td>
              <td>
                {cuidador.servicios.map(s => (
                  <Badge key={s.id} bg="info" className="me-1 mb-1">{s.descripcion}</Badge>
                ))}
              </td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip(cuidador.disponibilidad.join(', '))}
                >
                  <Button variant="outline-secondary" size="sm">
                    <InfoCircle /> Ver disponibilidad
                  </Button>
                </OverlayTrigger>
              </td>
              <td>{cuidador.ciudadResidencia}</td>
              <td>
                <Button variant="primary" size="sm">Ver perfil</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ComparacionCuidadores;