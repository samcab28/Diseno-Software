import mongoose, { Schema, Document, model } from 'mongoose';

// Interfaz para el modelo InfoCasa
interface IInfoCasa extends Document {
  idUsuario: mongoose.Types.number;  // Relación con el Usuario
  descripcionBase: string;
  idDireccion: mongoose.Types.number; // Referencia a la colección de Direcciones (Tipo correcto)
  caracteristicas: Schema.Types.Mixed[]; // Arreglo de objetos para características
}

// Esquema de InfoCasa
const InfoCasaSchema = new Schema<IInfoCasa>({
  idUsuario: { type: mongoose.Types.number, required: true, ref: 'Usuario' },
  descripcionBase: { type: String, required: true },
  idDireccion: { type: mongoose.Types.number, required: true, ref: 'Direccion' }, // Nueva referencia a Direccion
  caracteristicas: { type: [Schema.Types.Mixed], required: false } // Arreglo de mixed, sin campo `custom`
});

// Crear el modelo
const InfoCasaModel = model<IInfoCasa>('InfoCasa', InfoCasaSchema);

export { InfoCasaModel };
