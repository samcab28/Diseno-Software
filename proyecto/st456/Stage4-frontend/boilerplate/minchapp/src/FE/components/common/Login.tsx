import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { cognitoLogin } from '../../services/cognitoService';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = await cognitoLogin(email, password);
      
      if (token) {
        setToken(token);
        // Redirigir basado en el tipo de usuario
        const userType = token.payload['cognito:groups'][0];
        if (userType === 'host') {
          navigate('/host-dashboard');
        } else if (userType === 'cuidador') {
          navigate('/cuidador-dashboard');
        } else {
          setError('Tipo de usuario no reconocido');
        }
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intente de nuevo.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Iniciar Sesión
            </Button>


            <div className="mt-3" title='Espacio de relleno'></div>  
            <div className="mt-3"></div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;