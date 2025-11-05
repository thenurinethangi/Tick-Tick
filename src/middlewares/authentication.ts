import { Request, Response, NextFunction } from "express"
import { validateToken } from "../utils/jwtutil";
import { Role } from "../models/userModel";

export interface AuthRequest extends Request{
    username?: string
    roles?: Role[]
}

export const authentication = (req: AuthRequest, res: Response, next: NextFunction) => {

    const jwtToken = req.cookies.jwt;

    if(!jwtToken){
        res.status(401).json({message: 'Please Login!', data: null});
        return;
    }

    const payload = validateToken(jwtToken);
    if(!payload){
        res.status(401).json({message: 'Token Invalid, Please Login!', data: null});
        return;
    }

    req.username = payload.username;
    req.roles = payload.role

    next();
}