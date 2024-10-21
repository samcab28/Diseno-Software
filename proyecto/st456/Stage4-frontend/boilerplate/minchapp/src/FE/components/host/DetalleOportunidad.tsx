import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { FaCalendar, FaDollarSign, FaHome, FaPaw } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import mockApiCuidador from '../../services/mockApiCuidador';
import { IPost, IInfoCasa } from '../../types';
import '../../styles/DetalleOportunidad.css';

const DetalleOportunidad: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [oportunidad, setOportunidad] = useState<IPost & { infoCasa: IInfoCasa } | null>(null);
  const [interesExpresado, setInteresExpresado] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchOportunidad = async () => {
      if (id && token) {
        try {
          const data = await mockApiCuidador.getOportunidadDetalle(id);
          setOportunidad(data);
        } catch (error) {
          console.error('Error fetching oportunidad:', error);
          setMensaje('Error al cargar los detalles de la oportunidad.');
        }
      }
    };
    fetchOportunidad();
  }, [id, token]);

  const handleExpresarInteres = async () => {
    if (id && token) {
      try {
        await mockApiCuidador.expresarInteres(id);
        setInteresExpresado(true);
        setMensaje('Has expresado interés en esta oportunidad. El host será notificado.');
      } catch (error) {
        console.error('Error al expresar interés:', error);
        setMensaje('Hubo un error al expresar interés. Por favor, intenta de nuevo.');
      }
    }
  };

  if (!token) {
    navigate('/login');
    return null;
  }

  if (!oportunidad) return <Container className="mt-4"><Alert variant="info">Cargando...</Alert></Container>;

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>{oportunidad.motivo}</Card.Title>
          <Card.Text>
            <FaCalendar className="me-2" /> Fecha: {oportunidad.fechaInicio.toLocaleDateString()} - {oportunidad.fechaFin.toLocaleDateString()}<br />
            <FaDollarSign className="me-2" /> Oferta: ${oportunidad.ofertaPago}<br />
            <FaHome className="me-2" /> Descripción de la casa: {oportunidad.infoCasa.descripcionBase}<br />
            <FaPaw className="me-2" /> Mascotas: {oportunidad.infoCasa.caracteristicas.find(c => c.tipo === 'mascotas')?.cantidad || 'No especificado'}
          </Card.Text>
          {!interesExpresado ? (
            <Button variant="primary" onClick={handleExpresarInteres}>
              Expresar Interés
            </Button>
          ) : (
            <Alert variant="success">
              Interés expresado
            </Alert>
          )}
          {mensaje && <Alert variant="info" className="mt-3">{mensaje}</Alert>}
        </Card.Body>
      </Card>
      <Button variant="secondary" onClick={() => navigate('/cuidador-dashboard')} className="mt-3">
        Volver al Dashboard
      </Button>
    </Container>
  );
};

export default DetalleOportunidad;