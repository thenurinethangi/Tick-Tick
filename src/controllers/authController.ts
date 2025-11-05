import { Request, Response} from "express"
import { Role, User } from "../models/userModel"
import bcryptjs from "bcryptjs"
import { generateToken } from "../utils/jwtutil"

export const signup = async (req: Request, res: Response) => {

    const {username, fullName, email, password} = req.body;

    if(!username || !fullName || !email || !password){
        res.status(400).json({message: 'All Field Reqired!', data: null});
        return;
    }
    
    let filter1 = {username: username} 
    let existUsers = await User.find(filter1);
    if(existUsers.length>0){
        res.status(400).json({message: 'This Username Already Exist, Try Another!', data: null});
        return;
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        fullName,
        email,
        password: hashedPassword,
        roles: [Role.USER]

    });

    const savedUser = await newUser.save();

    res.status(202).json({message: 'Signup Successfull!',data: savedUser});
}


export const signin = async (req: Request, res: Response) => {

    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).json({message: 'All Field Reqired!', data: null});
        return;
    }
    
    let filter1 = {username: username} 
    let user = await User.findOne(filter1);
    if(!user){
        res.status(400).json({message: 'User Not Exist, Please Signup!', data: null});
        return;
    }

    const isMatch = bcryptjs.compareSync(password,user.password);
    if(!isMatch){
        res.status(400).json({message: 'Password Incorrect!', data: null});
        return;
    }

    const token = generateToken(user);

    res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(202).json({message: 'Signin Successfull!',data: {jwtToken: token}});
}


export const adminRegister = async (req: Request, res: Response) => {

    const {username, fullName, email, password} = req.body;

    if(!username || !fullName || !email || !password){
        res.status(400).json({message: 'All Field Reqired!', data: null});
        return;
    }
    
    let filter1 = {username: username} 
    let existUser = await User.findOne(filter1);

    if(existUser && existUser.roles.includes(Role.ADMIN)){
        res.status(400).json({message: 'This Admin Already Exist, Try Another!', data: null});
        return;
    }
    else if(existUser && existUser.roles.includes(Role.USER)){
        existUser.roles.push(Role.ADMIN);
        const isUpdated = await User.updateOne(filter1,existUser);

        if (isUpdated){
            res.status(202).json({message: 'Registered New Admin Successfully!',data: existUser});
            return;
        }
        else{
            res.status(500).json({message: 'Failed To Add New Admin, Try Later!',data: null});
            return; 
        }
    }
    else{
        const hashedPassword = bcryptjs.hashSync(password,10);

        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword,
            roles: [Role.ADMIN]

        });

        const savedUser = await newUser.save();

        res.status(202).json({message: 'Registered New Admin Successfully!',data: savedUser});
        return;
    }
}