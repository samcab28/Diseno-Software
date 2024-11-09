// src/api/infoCasa/infoCasaModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IInfoCasa extends Document {
  idUsuario: Number;
  descripcionBase: string;
  idDireccion: Number;
  caracteristicas: Schema.Types.Mixed[];
}

const InfoCasaSchema = new Schema<IInfoCasa>({
  idUsuario: { type: Number, required: true, ref: 'Usuario' },
  descripcionBase: { type: String, required: true },
  idDireccion: { type: Number, required: true, ref: 'Direccion' },
  caracteristicas: { type: [Schema.Types.Mixed], required: false }
});

export const InfoCasaModel = mongoose.model<IInfoCasa>('InfoCasa', InfoCasaSchema, 'InfoCasa');