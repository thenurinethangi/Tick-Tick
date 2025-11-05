import express, {Request,Response,NextFunction} from 'express'
import { AuthRequest } from '../middlewares/authentication';
import { User } from '../models/userModel';
import { Task } from '../models/taskModel';

export const addTask = async (req: AuthRequest,res: Response) => {

    const {description,date,note,priority} = req.body;

    if(!description || !date || !note || !priority){
        res.status(400).json({message: 'All Field Reqired!', data: null});
        return;
    }

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

    const newTask = new Task({
        description,
        date: new Date(date),
        note,
        priority,
        userId: user._id
    });

    const savedTask = await newTask.save();

    res.status(202).json({message: 'Successfully Added New Task!', data: savedTask});
    return;
}