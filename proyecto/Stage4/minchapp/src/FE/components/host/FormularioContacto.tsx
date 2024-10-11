import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Post } from '../../types';

interface FormularioContactoProps {
  idCuidador: number;
}

interface FormValues extends Omit<Post, 'id' | 'idUsuario' | 'idInfoBasica' | 'subJsonPagos' | 'estadoReservado'> {
  tipoMascota: string;
  necesidadesEspeciales: string;
  serviciosAdicionales: string[];
}

const serviciosAdicionalesOpciones = [
  'Paseos',
  'Administración de medicamentos',
  'Baño',
  'Corte de uñas',
  'Entrenamiento básico',
  'Cuidado nocturno'
];

const FormularioContacto: React.FC<FormularioContactoProps> = ({ idCuidador }) => {
  const [showAlert, setShowAlert] = useState(false);

  const initialValues: FormValues = {
    motivo: '',
    ofertaPago: 0,
    fechaInicio: new Date(),
    fechaFin: new Date(),
    tipoMascota: '',
    necesidadesEspeciales: '',
    serviciosAdicionales: []
  };

  const validationSchema = Yup.object().shape({
    motivo: Yup.string().required('El motivo es requerido').min(10, 'El motivo debe tener al menos 10 caracteres'),
    ofertaPago: Yup.number().required('La oferta de pago es requerida').min(1, 'La oferta debe ser mayor a 0'),
    fechaInicio: Yup.date().required('La fecha de inicio es requerida').min(new Date(), 'La fecha de inicio debe ser futura'),
    fechaFin: Yup.date().required('La fecha de fin es requerida')
      .min(Yup.ref('fechaInicio'), 'La fecha de fin debe ser posterior a la fecha de inicio'),
    tipoMascota: Yup.string().required('El tipo de mascota es requerido'),
    necesidadesEspeciales: Yup.string(),
    serviciosAdicionales: Yup.array().of(Yup.string())
  });

  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }: any) => {
    // Simulación de envío de formulario
    setTimeout(() => {
      console.log('Datos del formulario:', { ...values, idCuidador });
      setShowAlert(true);
      setSubmitting(false);
      resetForm();
    }, 500);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Contacta al Cuidador</h1>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Tu solicitud ha sido enviada con éxito. El cuidador la revisará pronto.
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          isSubmitting
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formMotivo">
              <Form.Label>Motivo de la solicitud</Form.Label>
              <Form.Control
                type="text"
                name="motivo"
                value={values.motivo}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.motivo && !!errors.motivo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.motivo}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOfertaPago">
              <Form.Label>Oferta de pago (por día)</Form.Label>
              <Form.Control
                type="number"
                name="ofertaPago"
                value={values.ofertaPago}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.ofertaPago && !!errors.ofertaPago}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ofertaPago}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFechaInicio">
                  <Form.Label>Fecha de inicio del servicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaInicio"
                    value={values.fechaInicio instanceof Date ? values.fechaInicio.toISOString().split('T')[0] : values.fechaInicio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.fechaInicio && !!errors.fechaInicio}
                  />
                  <Form.Control.Feedback type="invalid">
                    {typeof errors.fechaFin === 'string' && errors.fechaFin}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFechaFin">
                  <Form.Label>Fecha de fin del servicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaFin"
                    value={values.fechaFin instanceof Date ? values.fechaFin.toISOString().split('T')[0] : values.fechaFin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.fechaFin && !!errors.fechaFin}
                  />
                  <Form.Control.Feedback type="invalid">
                    {typeof errors.fechaFin === 'string' && errors.fechaFin}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formTipoMascota">
              <Form.Label>Tipo de mascota</Form.Label>
              <Form.Control
                type="text"
                name="tipoMascota"
                value={values.tipoMascota}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.tipoMascota && !!errors.tipoMascota}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tipoMascota}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNecesidadesEspeciales">
              <Form.Label>Necesidades especiales (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="necesidadesEspeciales"
                value={values.necesidadesEspeciales}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formServiciosAdicionales">
              <Form.Label>Servicios adicionales</Form.Label>
              {serviciosAdicionalesOpciones.map((servicio) => (
                <Form.Check
                  key={servicio}
                  type="checkbox"
                  id={`servicio-${servicio}`}
                  label={servicio}
                  name="serviciosAdicionales"
                  value={servicio}
                  checked={values.serviciosAdicionales.includes(servicio)}
                  onChange={handleChange}
                />
              ))}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Enviar Solicitud
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FormularioContacto;