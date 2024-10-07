import mongoose, { Schema, Document, model } from 'mongoose';

// Interfaz para el modelo `InfoCasa`
interface IInfoCasa extends Document {
  idUsuario: number;
  idDireccion: number;
  descripcionBase: string;
  numHabitaciones: number;
  numBanos: number;
  descripcionCuidados: string;
  piscina: boolean;
  jardin: boolean;
  mascotas: boolean;
}

// Esquema de `InfoCasa`
const InfoCasaSchema = new Schema<IInfoCasa>({
  idUsuario: { type: Number, required: true },
  idDireccion: { type: Number, required: true },
  descripcionBase: { type: String, required: true },
  numHabitaciones: { type: Number, required: true },
  numBanos: { type: Number, required: true },
  descripcionCuidados: { type: String, required: true },
  piscina: { type: Boolean, required: true },
  jardin: { type: Boolean, required: true },
  mascotas: { type: Boolean, required: true }
});

// Crear modelos a partir de los esquemas
const InfoCasaModel = model<IInfoCasa>('InfoCasa', InfoCasaSchema);

export {InfoCasaModel };
