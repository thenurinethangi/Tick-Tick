import express, {Request, Response, NextFunction} from 'express'
import { AuthRequest } from '../middlewares/authentication'
import { User } from '../models/userModel';

export const getUserDetails = async (req : AuthRequest,res: Response) => {

    if(!req.username){
            res.status(401).json({message: 'Please Signin!', data: null});
            return;
        }
    
    let filter1 = {username: req.username};
    const user = await User.findOne(filter1);
    if(!user){
        res.status(401).json({message: 'Please Signup!', data: null});
        return;
    }

    res.status(202).json({message: 'Successfully Load User Deatils!', data: user });
    return;
}