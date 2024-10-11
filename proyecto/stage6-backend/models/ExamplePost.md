db.Post.insertOne({
  idUsuario: ObjectId("652f2fc93f1a4b1f78b4d812"),  // ID del usuario que crea el post
  motivo: "Busco cuidador para mis mascotas durante las vacaciones",
  idInfoBasica: ObjectId("652f2f5c3f1a4b1f78b4d809"),  // ID de la InfoCasa relacionada
  ofertaPago: 150.00,  // Oferta de pago por el servicio
  fechaInicio: new Date("2024-12-20"),  // Fecha de inicio del servicio
  fechaFin: new Date("2024-12-27"),  // Fecha de fin del servicio
  estadoReservado: false,  // Estado de la reserva
  deleted: false  // Campo para indicar si está eliminado
});
