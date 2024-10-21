import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import mockApiCuidador from '../../services/mockApiCuidador';
import { IPost } from '../../types';
import { FaCalendar, FaDollarSign } from 'react-icons/fa';

const BuscarOportunidades: React.FC = () => {
  const [oportunidades, setOportunidades] = useState<IPost[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOportunidades = async () => {
      if (token) {
        try {
          const data = await mockApiCuidador.getOportunidades();
          setOportunidades(data);
        } catch (error) {
          console.error('Error fetching oportunidades:', error);
        }
      }
    };

    fetchOportunidades();
  }, [token]);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Buscar Nuevas Oportunidades</h1>
      <Card>
        <Card.Body>
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
    </Container>
  );
};

export default BuscarOportunidades;