import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import mockApiHost from '../../services/mockApiHost';
import { IPost, IInfoCasa } from '../../types';
import { FaCalendar, FaDollarSign, FaHome, FaPaw, FaBed, FaBath } from 'react-icons/fa';
import '../../styles/PublicarNecesidad.css';

const PublishCareNeed: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    motivo: '',
    fechaInicio: '',
    fechaFin: '',
    ofertaPago: '',
    descripcionBase: '',
    numHabitaciones: '',
    numBanos: '',
    mascotas: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const idUsuario = token?.payload?.sub ? parseInt(token.payload.sub) : 0;
      
      const infoCasa: Partial<IInfoCasa> = {
        idUsuario,
        descripcionBase: formData.descripcionBase,
        caracteristicas: [
          { tipo: 'habitaciones', cantidad: parseInt(formData.numHabitaciones) },
          { tipo: 'baños', cantidad: parseInt(formData.numBanos) },
          { tipo: 'mascotas', cantidad: parseInt(formData.mascotas) }
        ]
      };

      const post: Partial<IPost> = {
        idUsuario,
        motivo: formData.motivo,
        ofertaPago: parseFloat(formData.ofertaPago),
        fechaInicio: new Date(formData.fechaInicio),
        fechaFin: new Date(formData.fechaFin),
        estado: 'pendiente',
        fechaPublicacion: new Date(),
        deleted: false
      };

      // Aquí llamarías a tu API real. Por ahora, usamos el mock.
      await mockApiHost.publicarNecesidad(post, infoCasa, idUsuario);
      setSuccess(true);
      setTimeout(() => navigate('/host-dashboard'), 2000);
    } catch (err) {
      setError('Error al publicar la necesidad. Por favor, intente de nuevo.');
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Publicar Cuidado</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><FaHome className="me-2" />Motivo del cuidado</Form.Label>
              <Form.Control
                type="text"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                required
                placeholder="Ej: Cuidado de casa durante vacaciones"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label><FaCalendar className="me-2" />Fecha de inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label><FaCalendar className="me-2" />Fecha de fin</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label><FaDollarSign className="me-2" />Oferta de pago (por día)</Form.Label>
              <Form.Control
                type="number"
                name="ofertaPago"
                value={formData.ofertaPago}
                onChange={handleChange}
                required
                placeholder="Ej: 50"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FaHome className="me-2" />Descripción de la casa</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcionBase"
                value={formData.descripcionBase}
                onChange={handleChange}
                required
                placeholder="Describe brevemente tu casa"
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label><FaBed className="me-2" />Número de habitaciones</Form.Label>
                  <Form.Control
                    type="number"
                    name="numHabitaciones"
                    value={formData.numHabitaciones}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 2"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label><FaBath className="me-2" />Número de baños</Form.Label>
                  <Form.Control
                    type="number"
                    name="numBanos"
                    value={formData.numBanos}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 1"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label><FaPaw className="me-2" />Cantidad de mascotas</Form.Label>
                  <Form.Control
                    type="number"
                    name="mascotas"
                    value={formData.mascotas}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 2"
                  />
                </Form.Group>
              </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Necesidad publicada con éxito. Redirigiendo...</Alert>}

            <Button variant="primary" type="submit">
              Publicar Necesidad
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PublishCareNeed;