import { Usuario, IPost, ServicioAdicional, IInfoCasa, Review } from "../types";

interface PerfilCuidadorExtendido extends Usuario {
    servicios: ServicioAdicional[];
    calificacion: number;
    experiencia: string;
    reviews: Review[];
  }
  
  interface CuidadorConServicios extends Usuario {
    servicios: ServicioAdicional[];
    calificacion: number;
}

const mockApiCuidador = {
  getCuidadorData: async (email: string): Promise<Usuario> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      idUsuario: 1,
      nombre: 'Juan',
      apellido1: 'Pérez',
      apellido2: 'García',
      fechaNacimiento: new Date('1990-01-01'),
      urlImagenPerfil: '../assets/JuanPerez.jpeg',
      telefono: '123456789',
      email: email,
      contrasena: '',
      idDireccion: 1
    };
  },

  getOportunidades: async (): Promise<IPost[]> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
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
      }
    ];
  },

  getOportunidadDetalle: async (id: string): Promise<IPost & { infoCasa: IInfoCasa }> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      _id: id,
      idUsuario: 2,
      motivo: 'Cuidado de casa durante vacaciones',
      idInfoCasa: '1',
      ofertaPago: 500,
      fechaInicio: new Date('2023-12-01'),
      fechaFin: new Date('2023-12-15'),
      estado: 'pendiente',
      fechaPublicacion: new Date('2023-11-01'),
      deleted: false,
      infoCasa: {
        _id: '1',
        idUsuario: 2,
        descripcionBase: 'Casa amplia con jardín',
        idDireccion: 1,
        caracteristicas: [
          { tipo: 'habitaciones', cantidad: 3 },
          { tipo: 'baños', cantidad: 2 }
        ]
      }
    };
  },

  getSolicitudesEnviadas: async (): Promise<IPost[]> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        _id: '2',
        idUsuario: 3,
        motivo: 'Cuidado de mascotas por fin de semana',
        idInfoCasa: '2',
        ofertaPago: 300,
        fechaInicio: new Date('2023-11-20'),
        fechaFin: new Date('2023-11-22'),
        estado: 'pendiente',
        fechaPublicacion: new Date('2023-11-05'),
        deleted: false
      }
    ];
  },

  getServicios: async (): Promise<ServicioAdicional[]> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        idServicio: 1,
        idUsuario: 1,
        descripcion: 'Paseo de perros',
        deleted: false
      },
      {
        idServicio: 2,
        idUsuario: 1,
        descripcion: 'Cuidado de gatos',
        deleted: false
      }
    ];
  },

  getPosts: async (): Promise<(IPost & { infoCasa: IInfoCasa })[]> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        _id: '1',
        idUsuario: 2,
        motivo: 'Cuidado de casa durante vacaciones',
        idInfoCasa: '1',
        ofertaPago: 500,
        fechaInicio: new Date('2023-12-01'),
        fechaFin: new Date('2023-12-15'),
        estado: 'pendiente',
        fechaPublicacion: new Date('2023-11-01'),
        deleted: false,
        infoCasa: {
          _id: '1',
          idUsuario: 2,
          descripcionBase: 'Casa amplia con jardín',
          idDireccion: 1,
          caracteristicas: [
            { tipo: 'habitaciones', cantidad: 3 },
            { tipo: 'baños', cantidad: 2 }
          ]
        }
      },
      // TODO: Agregar otros ejemplos
    ];
  },

  handleLike: async (postId: string): Promise<void> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Liked post ${postId}`);
    // simular el envio de una notificacion al backend usando amazon sns
  }, 

  getCuidadores: async (): Promise<CuidadorConServicios[]> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        idUsuario: 1,
        nombre: 'Ana',
        apellido1: 'García',
        apellido2: 'Martínez',
        fechaNacimiento: new Date('1990-05-15'),
        urlImagenPerfil: 'https://example.com/ana.jpg',
        telefono: '123456789',
        email: 'ana@example.com',
        contrasena: '',
        idDireccion: 1,
        servicios: [{ idServicio: 1, idUsuario: 1, descripcion: 'Cuidado de perros', deleted: false }],
        calificacion: 4.8
      },
      {
        idUsuario: 2,
        nombre: 'Carlos',
        apellido1: 'Rodríguez',
        apellido2: 'López',
        fechaNacimiento: new Date('1988-10-20'),
        urlImagenPerfil: 'https://example.com/carlos.jpg',
        telefono: '987654321',
        email: 'carlos@example.com',
        contrasena: '',
        idDireccion: 2,
        servicios: [{ idServicio: 2, idUsuario: 2, descripcion: 'Cuidado de gatos', deleted: false }],
        calificacion: 4.5
      }
    ];
  },

  getCuidadorPerfil: async (id: string): Promise<PerfilCuidadorExtendido> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulación de datos del cuidador
    const cuidadorMock: PerfilCuidadorExtendido = {
      idUsuario: parseInt(id),
      nombre: 'Ana',
      apellido1: 'García',
      apellido2: 'Martínez',
      fechaNacimiento: new Date('1990-05-15'),
      urlImagenPerfil: 'https://example.com/ana.jpg',
      telefono: '123456789',
      email: 'ana@example.com',
      contrasena: '',
      idDireccion: 1,
      servicios: [
        { idServicio: 1, idUsuario: parseInt(id), descripcion: 'Cuidado de perros', deleted: false },
        { idServicio: 2, idUsuario: parseInt(id), descripcion: 'Cuidado de gatos', deleted: false }
      ],
      calificacion: 4.8,
      experiencia: '5 años de experiencia en cuidado de mascotas',
      reviews: [
        { id: '1', idUsuario: 2, idCuidador: parseInt(id), calificacion: 5, comentario: 'Excelente cuidadora, muy atenta y cariñosa con las mascotas.', fecha: new Date('2023-06-15') },
        { id: '2', idUsuario: 3, idCuidador: parseInt(id), calificacion: 4, comentario: 'Muy responsable y puntual.', fecha: new Date('2023-07-20') }
      ]
    };
    
    return cuidadorMock;
  },

  expresarInteres: async (idCuidador: string): Promise<void> => {
    // Llamar a la api 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Interés expresado en el cuidador ${idCuidador}`);
    // simular el envio de una notificacion al backend usando amazon sns
  },
};

export default mockApiCuidador;
