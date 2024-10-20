import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Toast } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { IPost, IInfoCasa } from '../../types';
import mockApiCuidador from '../../services/mockApiCuidador';

const ListaCasasCuidado: React.FC = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<(IPost & { infoCasa: IInfoCasa })[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await mockApiCuidador.getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      await mockApiCuidador.handleLike(postId);
      
      setToastMessage(`Se ha enviado una notificación al host de la publicación ${postId}`);
      setShowToast(true);

      // Actualizamos el estado local para reflejar el "like"
      setLikedPosts(prev => new Set(prev).add(postId));
    } catch (error) {
      console.error('Error handling like:', error);
      setToastMessage('Hubo un error al procesar tu interés. Por favor, intenta de nuevo.');
      setShowToast(true);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Casas Disponibles para Cuidar</h2>
      <Row>
        {posts.map(post => (
          <Col md={4} key={post._id.toString()}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{post.motivo}</Card.Title>
                <Card.Text>
                  Descripción: {post.infoCasa.descripcionBase}<br />
                  Fecha: {post.fechaInicio.toLocaleDateString()} - {post.fechaFin.toLocaleDateString()}<br />
                  Oferta: ${post.ofertaPago}
                </Card.Text>
                <Button 
                  variant={likedPosts.has(post._id.toString()) ? "success" : "primary"} 
                  onClick={() => handleLike(post._id.toString())}
                  disabled={likedPosts.has(post._id.toString())}
                >
                  {likedPosts.has(post._id.toString()) ? "Interesado" : "Me Interesa"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        delay={3000} 
        autohide
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Notificación</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default ListaCasasCuidado;