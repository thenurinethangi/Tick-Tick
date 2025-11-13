import jwt, { JwtPayload } from 'jsonwebtoken'
import { IUser, Role } from '../models/userModel'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const generateToken = (user: IUser) => {

    return jwt.sign(
        {
            username: user.email,
            role: user.roles
        },
        JWT_SECRET_KEY,
        {
            expiresIn: '1d'
        }
    );
}


export interface CustomJwtPayload extends JwtPayload {
  username: string;
  roles: Role[];
}

export const validateToken = (token: string) : CustomJwtPayload | null => {

    try{
        return jwt.verify(token,JWT_SECRET_KEY) as CustomJwtPayload;
    }
    catch(err){
        return null;
    }
}