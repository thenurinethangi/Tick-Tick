import mongoose, {Schema, Document} from "mongoose";

export interface INote extends Document{
    _id: mongoose.Types.ObjectId,
    note: string,
    create_at: Date,
    userId: mongoose.Types.ObjectId
}

const noteSchema = new Schema<INote>({
    note: {type: String, require: true},
    create_at: {type: Date, require: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', require: true}
});

export const Note = mongoose.model<INote>('Note',noteSchema);