import mongoose, {Schema, Document} from "mongoose";

export enum Role{
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IUser extends Document{
    _id: mongoose.Types.ObjectId,
    fullName?: string,
    email: string,
    password: string,
    roles: Role[]
}

const userSchema = new Schema<IUser>({
    fullName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    roles: {type: [String], enum: Object.values(Role), default: [Role.USER], require: true}
});

export const User = mongoose.model<IUser>('User',userSchema);