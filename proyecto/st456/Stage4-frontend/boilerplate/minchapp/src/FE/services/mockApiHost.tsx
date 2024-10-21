import { Usuario, IPost, Favoritos, SolicitudCuidador, MensajeChat, IInfoCasa } from '../types';

const mockApiHost = {
  getHost: async (token: string): Promise<Usuario> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      idUsuario: 2,
      nombre: 'María',
      apellido1: 'González',
      apellido2: 'López',
      fechaNacimiento: new Date('1985-05-15'),
      urlImagenPerfil: 'https://example.com/host-profile.jpg',
      telefono: '987654321',
      email: 'maria@example.com',
      contrasena: '',
      idDireccion: 2
    };
  },

  getPosts: async (userId: number): Promise<IPost[]> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        _id: '1',
        idUsuario: userId,
        motivo: 'Cuidado de casa durante vacaciones',
        idInfoCasa: '1',
        ofertaPago: 500,
        fechaInicio: new Date('2023-12-01'),
        fechaFin: new Date('2023-12-15'),
        estado: 'pendiente',
        fechaPublicacion: new Date('2023-11-01'),
        deleted: false
      }
    ];
  },

  getFavoritos: async (userId: number): Promise<Favoritos[]> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        idFavorito: 1,
        idUsuario: userId,
        idCuidador: 1,
        deleted: false
      }
    ];
  },

  getSolicitudes: async (userId: number): Promise<SolicitudCuidador[]> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        idSolicitud: '1',
        idNotificacion: '1',
        idCuidador: 3,
        idPost: '1',
        estado: 'pendiente'
      }
    ];
  },

  getMessages: async (hostId: number, cuidadorId: number): Promise<MensajeChat[]> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { id: '1', idEmisor: hostId, idReceptor: cuidadorId, contenido: "Hola, ¿estás disponible para cuidar mi casa la próxima semana?", fecha: new Date('2023-07-10T10:00:00'), leido: true },
      { id: '2', idEmisor: cuidadorId, idReceptor: hostId, contenido: "¡Hola! Sí, estoy disponible.", fecha: new Date('2023-07-10T10:05:00'), leido: true },
    ];
  },

  sendMessage: async (message: MensajeChat): Promise<void> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Mensaje enviado:', message);
  },

  publicarNecesidad: async (post: Partial<IPost>, infoCasa: Partial<IInfoCasa>, userId: number): Promise<void> => {
    // Simular una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generar IDs únicos 
    const infoId = "1";
    const postId = "1";

    // Completar la información de la casa
    const infoCompleta: IInfoCasa = {
      _id: infoId,
      ...infoCasa,
      idUsuario: infoCasa.idUsuario ?? userId,
      idDireccion: infoCasa.idDireccion ?? 1,
      descripcionBase: infoCasa.descripcionBase || '',
      caracteristicas: infoCasa.caracteristicas ?? [],
    };

    // Completar la información del post
    const postCompleto: IPost = {
      _id: postId,
      ...post,
      idInfoCasa: infoId,
    } as IPost;

    console.log('Información de la casa guardada:', infoCompleta);
    console.log('Post guardado:', postCompleto);
    // Aquí normalmente guardarías estos objetos en la base de datos
  },


};

export default mockApiHost;
