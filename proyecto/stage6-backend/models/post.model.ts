import mongoose, { Schema, Document, model } from 'mongoose';

// Interfaz para el modelo `Post`
interface IPost extends Document {
  idUsuario: number;
  motivo: string;
  idInfoBasica: number;
  ofertaPago: number;
  fechaInicio: Date;
  fechaFin: Date;
  subJsonPagos: Record<string, unknown>;
  estadoReservado: boolean;
}

// Esquema de `Post`
const PostSchema = new Schema<IPost>({
  idUsuario: { type: Number, required: true },
  motivo: { type: String, required: true },
  idInfoBasica: { type: Number, required: true },
  ofertaPago: { type: Number, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  subJsonPagos: { type: Object, default: {} },
  estadoReservado: { type: Boolean, default: false }
});

// Crear modelos a partir de los esquemas
const PostModel = model<IPost>('Post', PostSchema);

export { PostModel };
