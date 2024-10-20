import { useState, useEffect } from 'react';
import { Notificacion, Usuario, IPost, SolicitudCuidador } from '../types';

interface NotificacionConDetalles {
  notificacion: Notificacion;
  cuidador: Usuario;
  post: IPost;
  solicitud: SolicitudCuidador;
}

export const useNotifications = () => {
  const [notificaciones, setNotificaciones] = useState<NotificacionConDetalles[]>([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      // Simulación de una llamada API
      const response = await new Promise<NotificacionConDetalles[]>(resolve => {
        setTimeout(() => {
          resolve([
            {
              notificacion: {
                id: '1',
                destinatario: 'host@example.com',
                mensaje: 'Un cuidador está interesado en tu publicación',
                tipo: 'push',
                estado: 'enviado'
              },
              cuidador: {
                idUsuario: 3,
                nombre: 'Ana',
                apellido1: 'García',
                apellido2: 'López',
                fechaNacimiento: new Date('1992-05-15'),
                urlImagenPerfil: 'https://example.com/ana.jpg',
                telefono: '123456789',
                email: 'ana@example.com',
                contrasena: '',
                idDireccion: 3
              },
              post: {
                _id: '1',
                idUsuario: 2,
                motivo: 'Cuidado de casa durante vacaciones',
                idInfoCasa: '1',
                ofertaPago: 500,
                fechaInicio: new Date('2023-12-01'),
                fechaFin: new Date('2023-12-15'),
                estado: 'pendiente',
                fechaPublicacion: new Date('2023-11-01'),
                deleted: false
              },
              solicitud: {
                idSolicitud: '1',
                idNotificacion: '1',
                idCuidador: 3,
                idPost: '1',
                estado: 'pendiente'
              }
            },
          ]);
        }, 1000);
      });

      setNotificaciones(response);
    };

    fetchNotificaciones();
  }, []);

  const handleAccept = async (solicitudId: string) => {
    // Aquí normalmente enviarías una solicitud al backend para aceptar al cuidador
    console.log(`Aceptado cuidador de solicitud ${solicitudId}`);
    
    setNotificaciones(prev => prev.map(notif => 
      notif.solicitud.idSolicitud === solicitudId 
        ? { ...notif, solicitud: { ...notif.solicitud, estado: 'aceptado' } } 
        : notif
    ));
    
    return 'Has aceptado al cuidador. Se ha creado un match.';
  };

  const handleReject = async (solicitudId: string) => {
    // Aquí normalmente enviarías una solicitud al backend para rechazar al cuidador
    console.log(`Rechazado cuidador de solicitud ${solicitudId}`);
    
    setNotificaciones(prev => prev.map(notif => 
      notif.solicitud.idSolicitud === solicitudId 
        ? { ...notif, solicitud: { ...notif.solicitud, estado: 'rechazado' } } 
        : notif
    ));
    
    return 'Has rechazado al cuidador.';
  };

  return {
    notificaciones,
    handleAccept,
    handleReject
  };
};