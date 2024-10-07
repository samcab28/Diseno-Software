import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Post, InfoCasa } from '../types/index';
interface PostForm {
  motivo: string;
  infoBasica: string;
  ofertaPago: number;
  fechaInicio: string;
  fechaFin: string;
  subconPagos: string;
}

interface InfoCasaForm {
  idDireccion: number; // Como si se hubiera seleccionado de una lista
  descripcionBase: string;
  numHabitaciones: number;
  numBanos: number;
  descripcionCuidados: string;
  piscina: boolean;
  jardin: boolean;
  mascotas: boolean;
}

const PublishCareNeedPage: React.FC = () => {
    const [postForm, setPostForm] = useState<Omit<Post, 'id' | 'idUsuario' | 'estadoRservado'>>({
      motivo: '',
      infoBasica: '',
      ofertaPago: 0,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      subconPagos: '',
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
      setPostForm(prev => ({ ...prev, [name]: value }));
    };
  
    const handleInfoCasaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
      setInfoCasaForm(prev => ({ ...prev, [name]: updatedValue }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Logica para enviar los datos al servidor
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
              <Form.Label>Información Básica</Form.Label>
              <Form.Control 
                type="text" 
                name="infoBasica"
                value={postForm.infoBasica}
                onChange={handlePostChange}
                placeholder="Información básica del cuidado"
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
                value={postForm.fechaInicio instanceof Date ? postForm.fechaInicio.toISOString().split('T')[0] : postForm.fechaInicio}
                onChange={handlePostChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Subcontratación de Pagos</Form.Label>
          <Form.Control 
            type="text" 
            name="subconPagos"
            value={postForm.subconPagos}
            onChange={handlePostChange}
            placeholder="Detalles de subcontratación de pagos"
          />
        </Form.Group>
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