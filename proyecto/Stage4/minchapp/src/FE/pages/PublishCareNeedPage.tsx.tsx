import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Post, InfoCasa } from '../types/index';

const PublishCareNeedPage: React.FC = () => {
    const [postForm, setPostForm] = useState<Omit<Post, 'id' | 'idUsuario' | 'estadoReservado'>>({
      motivo: '',
      idInfoBasica: 0, 
      ofertaPago: 0,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      subJsonPagos: {}, 
    });
  
    const [infoCasaForm, setInfoCasaForm] = useState<Omit<InfoCasa, 'id' | 'idUsuario'>>({
      idDireccion: 0,
      descripcionBase: '',
      numHabitaciones: 0,
      numBanos: 0,
      descripcionCuidados: '',
      piscina: false,
      jardin: false,
      mascotas: false,
    });
  
    const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setPostForm(prev => ({ 
        ...prev, 
        [name]: name === 'ofertaPago' || name === 'idInfoBasica' ? Number(value) : value 
      }));
    };
  
    const handleInfoCasaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
      setInfoCasaForm(prev => ({ 
        ...prev, 
        [name]: ['numHabitaciones', 'numBanos'].includes(name) ? Number(value) : updatedValue 
      }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Lógica para enviar los datos al servidor
      console.log({ post: postForm, infoCasa: infoCasaForm });
    };

  return (
    <Container className="my-4">
      <h1>Publicar Necesidad de Cuidado</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Motivo</Form.Label>
              <Form.Control 
                type="text" 
                name="motivo"
                value={postForm.motivo}
                onChange={handlePostChange}
                placeholder="Motivo del cuidado"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>ID de Información Básica</Form.Label>
              <Form.Control 
                type="number" 
                name="idInfoBasica"
                value={postForm.idInfoBasica}
                onChange={handlePostChange}
                placeholder="ID de información básica"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Oferta de Pago</Form.Label>
              <Form.Control 
                type="number" 
                name="ofertaPago"
                value={postForm.ofertaPago}
                onChange={handlePostChange}
                placeholder="Monto ofrecido"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control 
                type="date" 
                name="fechaInicio"
                value={postForm.fechaInicio instanceof Date ? postForm.fechaInicio.toISOString().split('T')[0] : postForm.fechaInicio}
                onChange={handlePostChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control 
                type="date" 
                name="fechaFin"
                value={postForm.fechaFin instanceof Date ? postForm.fechaFin.toISOString().split('T')[0] : postForm.fechaFin}
                onChange={handlePostChange}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Eliminado el campo subconPagos ya que no es parte de la interfaz Post */}
        <h2>Información de la Casa</h2>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Descripción Base</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="descripcionBase"
                value={infoCasaForm.descripcionBase}
                onChange={handleInfoCasaChange}
                placeholder="Descripción general de la casa"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Descripción de Cuidados</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="descripcionCuidados"
                value={infoCasaForm.descripcionCuidados}
                onChange={handleInfoCasaChange}
                placeholder="Detalles específicos sobre los cuidados requeridos"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Número de Habitaciones</Form.Label>
              <Form.Control 
                type="number" 
                name="numHabitaciones"
                value={infoCasaForm.numHabitaciones}
                onChange={handleInfoCasaChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Número de Baños</Form.Label>
              <Form.Control 
                type="number" 
                name="numBanos"
                value={infoCasaForm.numBanos}
                onChange={handleInfoCasaChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Características</Form.Label>
              <Form.Check 
                type="checkbox" 
                label="Piscina" 
                name="piscina"
                checked={infoCasaForm.piscina}
                onChange={handleInfoCasaChange}
              />
              <Form.Check 
                type="checkbox" 
                label="Jardín" 
                name="jardin"
                checked={infoCasaForm.jardin}
                onChange={handleInfoCasaChange}
              />
              <Form.Check 
                type="checkbox" 
                label="Mascotas" 
                name="mascotas"
                checked={infoCasaForm.mascotas}
                onChange={handleInfoCasaChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Publicar Necesidad de Cuidado
        </Button>
      </Form>
    </Container>
  );
};

export default PublishCareNeedPage;