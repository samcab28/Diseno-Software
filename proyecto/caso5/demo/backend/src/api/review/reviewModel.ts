// src/api/review/reviewModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
    fromUserId: number;    // El usuario que hace la review
    toUserId: number;      // El usuario que recibe la review
    rating: number;        // Calificación de 1-5
    comment: string;       // Comentario de la review
    userType: string;      // cuidador o host 
    postId: Schema.Types.ObjectId; // ID del post relacionado
    responseComment?: string;   // Respuesta a la review
    responseDate?: Date;        // Fecha de la respuesta
    createdAt: Date;           // Fecha de creación
    deleted: boolean;          // Flag para soft delete
}

const ReviewSchema = new Schema<IReview>({
    fromUserId: { 
        type: Number, 
        required: true,
        ref: 'Usuario' 
    },
    toUserId: { 
        type: Number, 
        required: true,
        ref: 'Usuario' 
    },
    rating: { 
        type: Number, 
        required: true,
        min: 1,
        max: 5 
    },
    comment: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 500 
    },
    userType: { 
        type: String, 
        required: true,
        enum: ['publisher', 'caregiver'] 
    },
    postId: { 
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'Post' 
    },
    responseComment: { 
        type: String,
        maxlength: 500 
    },
    responseDate: { 
        type: Date 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    deleted: { 
        type: Boolean, 
        default: false 
    }
});

// Índices para optimizar consultas
ReviewSchema.index({ fromUserId: 1, toUserId: 1 });
ReviewSchema.index({ toUserId: 1, userType: 1 });
ReviewSchema.index({ postId: 1 });

export const Review = mongoose.model<IReview>('Review', ReviewSchema);