import React from 'react';
import { Container, Table, Image, Button } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';

interface Cuidador {
  id: string;
  nombre: string;
  foto: string;
  calificacion: number;
  especialidad: string;
  experiencia: string;
  tarifa: number;
  disponibilidad: string;
}

const ComparacionCuidadores: React.FC = () => {
  const cuidadores: Cuidador[] = [
    {
      id: '1',
      nombre: 'Pamela Morataya',
      foto: '/img/pamela.jpg',
      calificacion: 4.8,
      especialidad: 'Perros',
      experiencia: '5 años',
      tarifa: 20,
      disponibilidad: 'Lun-Vie',
    },
    {
      id: '2',
      nombre: 'Luis Urbina',
      foto: '/img/luis.jpg',
      calificacion: 4.5,
      especialidad: 'Gatos',
      experiencia: '3 años',
      tarifa: 18,
      disponibilidad: 'Lun-Dom',
    },
    // Ejemplo de cuidadores
  ];

  return (
    <Container className="my-4">
      <h1 className="mb-4">Compara Cuidadores</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Cuidador</th>
            <th>Calificación</th>
            <th>Especialidad</th>
            <th>Experiencia</th>
            <th>Tarifa (por hora)</th>
            <th>Disponibilidad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cuidadores.map(cuidador => (
            <tr key={cuidador.id}>
              <td>
                <Image src={cuidador.foto} roundedCircle width="50" height="50" className="me-2" />
                {cuidador.nombre}
              </td>
              <td>
                {cuidador.calificacion} <StarFill className="text-warning" />
              </td>
              <td>{cuidador.especialidad}</td>
              <td>{cuidador.experiencia}</td>
              <td>${cuidador.tarifa}</td>
              <td>{cuidador.disponibilidad}</td>
              <td>
                <Button variant="outline-primary" size="sm">Ver perfil</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ComparacionCuidadores;