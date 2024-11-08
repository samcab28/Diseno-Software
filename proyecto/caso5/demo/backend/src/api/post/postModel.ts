// src/api/post/postModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
    idUsuario: Number;
    motivo: string;
    idInfoCasa: mongoose.Types.ObjectId;
    ofertaPago: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
    fechaPublicacion: Date;
    deleted: boolean;
}

const PostSchema = new Schema<IPost>({
    idUsuario: { type: Number, required: true, ref: 'Usuario' },
    motivo: { type: String, required: true },
    idInfoCasa: { type: Schema.Types.ObjectId, required: true, ref: 'InfoCasa' },
    ofertaPago: { type: Number, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    estado: { 
        type: String, 
        required: true, 
        enum: ['pendiente', 'aceptado', 'rechazado', 'completado']
    },
    fechaPublicacion: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

export const PostModel = mongoose.model<IPost>('Post', PostSchema);