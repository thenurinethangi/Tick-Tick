import express, {Request, Response, NextFunction} from 'express'
import { AuthRequest } from '../middlewares/authentication';
import { User } from '../models/userModel';
import { Note } from '../models/noteModel';

export const addNote = async (req: AuthRequest,res: Response) => {

    const {note} = req.body;

    if(!note){
        res.status(400).json({message: 'Note Can\'t Be Empty!', data: null});
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

    const newNote = new Note({
        note: note,
        create_at: new Date(),
        userId: user._id
    });

    const savedNote = await newNote.save();

    res.status(202).json({message: 'Successfully Add New Note!', data: savedNote});
    return;
}