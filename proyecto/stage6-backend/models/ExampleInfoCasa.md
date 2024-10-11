db.InfoCasa.insertOne({
  idUsuario: ObjectId("usuario_id"),
  descripcionBase: "Casa moderna cerca de la playa",
  numHabitaciones: 3,
  numBanos: 2,
  piscina: true,
  jardin: true,
  mascotas: false,
  caracteristicasHabitaciones: [
    { nombre: "tipoCama", valor: "King Size" },
    { nombre: "vistas", valor: "Vista al mar" }
  ]
});
