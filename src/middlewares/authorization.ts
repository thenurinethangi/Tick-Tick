import { Request, Response, NextFunction } from "express"
import { Role } from "../models/userModel";

interface authRequest extends Request{
    username?: string
    roles?: Role[]
} 

export const authorization = (roles1: Role[]) => {

    console.log('roles1',roles1);

    return (req: authRequest, res: Response, next: NextFunction) => {
        console.log('req username',req.username);
        const username = req.username;
        console.log('req roles',req.roles);
        const roles2 = req.roles || [];

        console.log('roles2',roles2);

        for (let i = 0; i < roles1.length; i++) {
            const role = roles1[i];
            if (roles2.includes(role)){
                console.log(true);
                next();
                return;
            }
        }

        res.status(403).json({message: 'Don\'t have access!', data: null});
        return;
    }

}