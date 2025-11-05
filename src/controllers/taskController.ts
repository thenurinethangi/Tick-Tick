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

export const deleteTask = async (req: AuthRequest,res: Response) => {

    const _id = req.params.id;

    if(!_id){
        res.status(400).json({message: 'Need Task ID To Delete The Task!', data: null});
        return;
    }

    let filter1 = {_id: _id};
    const task = await Task.findOne(filter1);
    if(!task){
        res.status(404).json({message: 'Task Not Found!', data: null});
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

    if(task.userId.toString() !== user._id.toString()){
        res.status(400).json({message: 'You Can Only Delete Your Tasks!', data: null});
        return;
    }

    let filter3  = {_id: task._id};
    const result = await Task.deleteOne(filter3);

    if(result){
        res.status(202).json({message: 'Successfully Deleted Task ID: '+task._id, data: null});
        return;
    }
    else{
        res.status(5000).json({message: 'Failed To Delete The Task, Try Later!', data: null});
        return;
    }
}