import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: Date;
}

interface ChatComponentProps {
  hostId: number;
  cuidadorId: number;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ hostId, cuidadorId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Aquí se cargarían los mensajes desde una API
    const mockMessages: Message[] = [
      { id: 1, senderId: hostId, text: "Hola, ¿estás disponible para cuidar mi casa la próxima semana?", timestamp: new Date('2023-07-10T10:00:00') },
      { id: 2, senderId: cuidadorId, text: "¡Hola! Sí, estoy disponible.", timestamp: new Date('2023-07-10T10:05:00') },
    ];
    setMessages(mockMessages);
  }, [hostId, cuidadorId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: messages.length + 1,
      senderId: hostId, // Asumimos que el host está enviando el mensaje
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
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
                  className={`mb-2 ${msg.senderId === hostId ? 'text-end' : 'text-start'}`}
                >
                  <Card
                    bg={msg.senderId === hostId ? 'primary' : 'light'}
                    text={msg.senderId === hostId ? 'white' : 'dark'}
                    style={{ display: 'inline-block', maxWidth: '70%' }}
                  >
                    <Card.Body>
                      <Card.Text>{msg.text}</Card.Text>
                      <Card.Text>
                        <small>{msg.timestamp.toLocaleTimeString()}</small>
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