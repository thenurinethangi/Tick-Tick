import mongoose, {Schema, Document} from "mongoose";

export enum Priority{
    URGENT ='URGENT',
    NOT_URGENT = 'NOT URGENT',
    IMPORTANT = 'IMPORTANT',
    UNIMPORTANT = 'UNIMPORTANT'
}

export enum Status{
    COMPLETE = 'COMPLETE',
    INCOMPLETE = 'INCOMPLETE',
    NOTDO = 'NOTDO',
    DELETE = 'DELETE'
}

export interface ITask extends Document{
    _id: mongoose.Types.ObjectId,
    description: string,
    date: Date,
    note: string,
    priority: Priority,
    status: Status,
    userId: mongoose.Types.ObjectId
}

const taskSchema = new Schema<ITask>({
    description: {type: String, require: true},
    date: {type: Date, require: true},
    note: {type: String, require: true},
    priority: {type: String, enum: Object.values(Priority), require: true},
    status: {type: String, enum: Object.values(Status), require: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', require: true}
});

export const Task = mongoose.model<ITask>('Task',taskSchema);