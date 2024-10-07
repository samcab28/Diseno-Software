import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const FormularioContacto: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      // Logica para enviar el formulario
      setShowAlert(true);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Contacta al Cuidador</h1>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Tu mensaje ha sido enviado con éxito. El cuidador se pondrá en contacto contigo pronto.
        </Alert>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control required type="text" placeholder="Ingresa tu nombre" />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa tu nombre.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Ingresa tu email" />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa un email válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="tel" placeholder="Ingresa tu número de teléfono" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFechaInicio">
          <Form.Label>Fecha de inicio del servicio</Form.Label>
          <Form.Control required type="date" />
          <Form.Control.Feedback type="invalid">
            Por favor selecciona una fecha de inicio.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFechaFin">
          <Form.Label>Fecha de fin del servicio</Form.Label>
          <Form.Control required type="date" />
          <Form.Control.Feedback type="invalid">
            Por favor selecciona una fecha de fin.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control required as="textarea" rows={3} placeholder="Escribe tu mensaje aquí" />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa un mensaje.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar Solicitud
        </Button>
      </Form>
    </Container>
  );
};

export default FormularioContacto;