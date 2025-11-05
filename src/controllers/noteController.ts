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


export const deleteNote = async (req: AuthRequest,res: Response) => {

    const id = req.params.id;

    if(!id){
        res.status(400).json({message: 'Need Note ID To Delete The Note!', data: null});
        return;
    }

    let filter1 = {_id: id};
    const note = await Note.findOne(filter1);
    if(!note){
        res.status(401).json({message: 'Note Is Not Found!', data: null});
        return;
    }

    if(!req.username){
        res.status(401).json({message: 'Please Signin!', data: null});
        return;
    }

    let filter2 = {username: req.username};
    const user = await User.findOne(filter2);
    if(!user){
        res.status(401).json({message: 'Please Signup!', data: null});
        return;
    }

    if(note.userId.toString() !== user._id.toString()){
        res.status(401).json({message: 'You Can Only Delete Your Notes!', data: null});
        return;
    }

    const result = await Note.deleteOne(filter1);

    if(result){
        res.status(202).json({message: 'Successfully Deleted Note ID: '+note._id, data: null});
        return;
    }
    else{
        res.status(202).json({message: 'Failed To Delete Note, Try Again Later!', data: null});
        return;
    }
}


export const editNote = async (req: AuthRequest,res: Response) => {

    const {id,notedesc} = req.body;

    if(!id || !notedesc){
        res.status(400).json({message: 'Need Both Note ID And Edited Note To Edit Note!', data: null});
        return;
    }

    let filter1 = {_id: id};
    const note = await Note.findOne(filter1);
    if(!note){
        res.status(401).json({message: 'Note Is Not Found!', data: null});
        return;
    }

    if(!req.username){
        res.status(401).json({message: 'Please Signin!', data: null});
        return;
    }

    let filter2 = {username: req.username};
    const user = await User.findOne(filter2);
    if(!user){
        res.status(401).json({message: 'Please Signup!', data: null});
        return;
    }

    if(note.userId.toString() !== user._id.toString()){
        res.status(401).json({message: 'You Can Only Edit Your Notes!', data: null});
        return;
    }

    let updateQuery = {
        note: notedesc
    }
    const result = await Note.updateOne(filter1,updateQuery);

    if(result){
        res.status(202).json({message: 'Successfully Edited Note ID: '+note._id, data: null});
        return;
    }
    else{
        res.status(202).json({message: 'Failed To Edit Note, Try Again Later!', data: null});
        return;
    }
}