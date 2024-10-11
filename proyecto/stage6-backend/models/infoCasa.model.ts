import mongoose, { Schema, Document, model } from 'mongoose';

// Interfaz para el modelo InfoCasa
interface IInfoCasa extends Document {
  idUsuario: mongoose.Types.ObjectId;  // Relación con el Usuario
  descripcionBase: string;
  numHabitaciones: number;
  numBanos: number;
  piscina: boolean;
  jardin: boolean;
  mascotas: boolean;
  caracteristicasHabitaciones: Array<{
    nombre: string;
    valor: string;
  }>;
}

// Esquema de InfoCasa
const InfoCasaSchema = new Schema<IInfoCasa>({
  idUsuario: { type: mongoose.Types.ObjectId, ref: 'Usuario', required: true },
  descripcionBase: { type: String, required: true },
  numHabitaciones: { type: Number, required: true },
  numBanos: { type: Number, required: true },
  piscina: { type: Boolean, default: false },
  jardin: { type: Boolean, default: false },
  mascotas: { type: Boolean, default: false },
  caracteristicasHabitaciones: [
    {
      nombre: { type: String, required: true }, // Ej: 'tipoCama', 'tamaño', 'vistas'
      valor: { type: String, required: true }   // Ej: 'King Size', '30 m²', 'Vista al mar'
    }
  ]
});

// Crear el modelo
const InfoCasaModel = model<IInfoCasa>('InfoCasa', InfoCasaSchema);

export { InfoCasaModel };
