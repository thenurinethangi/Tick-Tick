import express, {Request, Response, NextFunction} from 'express'
import { AuthRequest } from '../middlewares/authentication';
import { User } from '../models/userModel';
import { Task } from '../models/taskModel';
import { Promo } from '../models/promoModel';

export const addPromo = async (req: AuthRequest,res: Response) => {

    const {time,taskId} = req.body;

    if(!time){
        res.status(400).json({message: 'Time Is Require!', data: null});
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

    let tId = null;
    if (taskId){
        let filter2 = {_id: taskId};
        const task = await Task.findOne(filter2);
        if(!task){
            res.status(401).json({message: 'Task Is Invalid!', data: null});
            return;
        }
        tId = task._id;
    }

    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(now.getTime() - offsetMs);
    
    const newPromo = new Promo({
        time,
        date: localDate,
        taskId: tId,
        userId: user._id
    });

    const savedPromo = await newPromo.save();

    res.status(202).json({message: 'Successfully Added New Promo!', data: savedPromo});
    return;
}


export const getTotalPromo = async (req: AuthRequest,res: Response) => {

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
    
    let filter2 = {userId: user._id};
    const allPromos = await Promo.find(filter2);

    res.status(202).json({message: 'Successfully Get Total Promo Count!', data: allPromos.length});
    return;
}


export const getTodayPromo = async (req: AuthRequest,res: Response) => {

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

    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(now.getTime() - offsetMs);

    const start = localDate.setHours(0,0,0,0);
    const end = localDate.setHours(23, 59, 59, 999);
    
    let filter2 = {userId: user._id, date: {$gte: start, $lte: end}};
    const todayPromos = await Promo.find(filter2);

    res.status(202).json({message: 'Successfully Get Today Promo Count!', data: todayPromos});
    return;
}


export const getTotalTime = async (req: AuthRequest,res: Response) => {

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
    
    let filter2 = {userId: user._id};
    const allPromos = await Promo.find(filter2);

    let sum = 0;
    for (let i = 0; i < allPromos.length; i++) {
        let timeInNumber = Number(allPromos[i].time);
        sum+=timeInNumber;
    }

    res.status(202).json({message: 'Successfully Get Total Promo Time!', data: sum});
    return;
}


export const getTodayTime = async (req: AuthRequest,res: Response) => {

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
    
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(now.getTime() - offsetMs);

    const start = localDate.setHours(0,0,0,0);
    const end = localDate.setHours(23, 59, 59, 999);
    
    let filter2 = {userId: user._id, date: {$gte: start, $lte: end}};
    const todayPromos = await Promo.find(filter2);

    let sum = 0;
    for (let i = 0; i < todayPromos.length; i++) {
        let timeInNumber = Number(todayPromos[i].time);
        sum+=timeInNumber;
    }

    res.status(202).json({message: 'Successfully Get Today Promo Time!', data: sum});
    return;
}


export const getTodayPromoList = async (req: AuthRequest,res: Response) => {

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
    
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(now.getTime() - offsetMs);

    const start = localDate.setHours(0,0,0,0);
    const end = localDate.setHours(23, 59, 59, 999);
    
    let filter2 = {userId: user._id, date: {$gte: start, $lte: end}};
    const todayPromos = await Promo.find(filter2).sort({date: 'desc'});

    res.status(202).json({message: 'Successfully Load Today Promo List!', data: todayPromos});
    return;
}