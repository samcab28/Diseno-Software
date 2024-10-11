import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para el modelo `Post`
interface IPost extends Document {
  idUsuario: number;
  motivo: string;
  idInfoCasa: number;
  ofertaPago: number;
  fechaInicio: Date;
  fechaFin: Date;
  estadoReservado: boolean;
  deleted: boolean;  // Eliminación lógica
}

// Esquema de `Post`
const PostSchema = new Schema<IPost>({
  idUsuario: { type: Number, required: true },
  motivo: { type: String, required: true },
  idInfoCasa: { type: Number, required: true },
  ofertaPago: { type: Number, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  estadoReservado: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false }
});

// Crear modelo
const PostModel = mongoose.model<IPost>('Post', PostSchema);

export { PostModel };
