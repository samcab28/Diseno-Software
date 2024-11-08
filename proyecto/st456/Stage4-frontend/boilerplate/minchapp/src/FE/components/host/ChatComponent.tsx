import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { MensajeChat } from '../../types';
import mockApiHost from '../../services/mockApiHost';

interface ChatComponentProps {
  hostId: number;
  cuidadorId: number;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ hostId, cuidadorId }) => {
  const [messages, setMessages] = useState<MensajeChat[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await mockApiHost.getMessages(hostId, cuidadorId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [hostId, cuidadorId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg: MensajeChat = {
      id: (messages.length + 1).toString(),
      idEmisor: hostId,
      idReceptor: cuidadorId,
      contenido: newMessage,
      fecha: new Date(),
      leido: false
    };

    try {
      await mockApiHost.sendMessage(newMsg);
      setMessages([...messages, newMsg]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Chat con Cuidador</h2>
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Body style={{ height: '400px', overflowY: 'auto' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 ${msg.idEmisor === hostId ? 'text-end' : 'text-start'}`}
                >
                  <Card
                    bg={msg.idEmisor === hostId ? 'primary' : 'light'}
                    text={msg.idEmisor === hostId ? 'white' : 'dark'}
                    style={{ display: 'inline-block', maxWidth: '70%' }}
                  >
                    <Card.Body>
                      <Card.Text>{msg.contenido}</Card.Text>
                      <Card.Text>
                        <small>{msg.fecha.toLocaleTimeString()}</small>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Card.Body>
            <Card.Footer>
              <Form onSubmit={handleSendMessage}>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe un mensaje..."
                    />
                  </Col>
                  <Col sm={2}>
                    <Button type="submit" variant="primary">Enviar</Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatComponent;