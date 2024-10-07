import React from 'react';
import { Container, Table, Image, Button } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { Cuidador } from '../../types';

const ComparacionCuidadores: React.FC = () => {
  const cuidadores: Cuidador[] = [
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
      especialidad: 'Perros',
      experiencia: '5 años',
      tarifa: 20,
      disponibilidad: 'Lun-Vie',
      descripcion: 'Amante de los animales con experiencia en cuidado de perros.',
      credenciales: ['Certificado en primeros auxilios para mascotas']
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
                <Image src={cuidador.urlImagenPerfil} roundedCircle width="50" height="50" className="me-2" />
                {`${cuidador.nombre} ${cuidador.apellido}`}
              </td>
              <td>
                {cuidador.ratingReviews} <StarFill className="text-warning" />
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