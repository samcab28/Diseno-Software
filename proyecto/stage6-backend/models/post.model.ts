import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para el modelo `Post`
interface IPost extends Document {
  idUsuario: mongoose.Types.number; 
  motivo: string;
  idInfoCasa: mongoose.Types.ObjectId; 
  ofertaPago: number;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string; 
  fechaPublicacion: Date;
  deleted: boolean; 
}

// Esquema de `Post`
const PostSchema = new Schema<IPost>({
  idUsuario: { type: mongoose.Types.number, required: true, ref: 'Usuario' },
  motivo: { type: String, required: true },
  idInfoCasa: { type: mongoose.Types.ObjectId, required: true, ref: 'InfoCasa' },
  ofertaPago: { type: Number, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  estado: { type: String, required: true, enum: ['pendiente', 'aceptado', 'rechazado', 'completado'] }, // Estados posibles
  fechaPublicacion: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }
});

// Crear modelo
const PostModel = mongoose.model<IPost>('Post', PostSchema);

export { PostModel };