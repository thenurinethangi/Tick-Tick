import mongoose, {Schema, Document} from "mongoose";

export interface IPromo extends Document{
    _id: mongoose.Types.ObjectId,
    time: string,
    date: Date,
    taskId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
}

const promoSchema = new Schema<IPromo>({
    time: {type: String, require: true},
    date: {type: Date, require: true},
    taskId: {type: Schema.Types.ObjectId, ref: 'Task', require: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', require: true}
});

export const Promo = mongoose.model<IPromo>('Promo',promoSchema);