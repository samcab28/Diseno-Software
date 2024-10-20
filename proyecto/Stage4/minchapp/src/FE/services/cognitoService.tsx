import { CognitoToken, TipoUsuarioEnum } from '../types';

const users = [
  { email: 'host@example.com', password: 'password123', tipo: 'host' as TipoUsuarioEnum },
  { email: 'cuidador@example.com', password: 'password123', tipo: 'cuidador' as TipoUsuarioEnum }
];

export const cognitoLogin = async (email: string, password: string): Promise<CognitoToken | null> => {
  // Simular una llamada a cognito
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const token: CognitoToken = {
      jwtToken: 'fake-jwt-token',
      payload: {
        sub: '12345',
        email: user.email,
        'cognito:groups': [user.tipo],
        exp: Date.now() + 3600000 // Token expira en 1 hora
      }
    };
    return token;
  }

  return null;
};