import mongoose, {Schema, Document} from "mongoose";

export enum Role{
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IUser extends Document{
    _id: mongoose.Types.ObjectId,
    username: string,
    fullName: string,
    email: string,
    password: string,
    roles: Role[]
}

const userSchema = new Schema<IUser>({
    username: {type: String, unique: true, require: true},
    fullName: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    roles: {type: [String], enum: Object.values(Role), default: [Role.USER], require: true}
});

export const User = mongoose.model<IUser>('User',userSchema);