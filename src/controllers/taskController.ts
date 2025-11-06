import express, {Request,Response,NextFunction} from 'express'
import { AuthRequest } from '../middlewares/authentication';
import { User } from '../models/userModel';
import { Priority, Status, Task } from '../models/taskModel';

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


export const editDate = async (req: AuthRequest,res: Response) => {

    const {id,date} = req.body;

    if(!id || !date){
        res.status(400).json({message: 'Need Task ID And New Date To Edit The Task Date!', data: null});
        return;
    }

    let filter1 = {_id: id};
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
        res.status(400).json({message: 'You Can Only Edit Your Tasks!', data: null});
        return;
    }

    let filter3  = {_id: task._id};
    let updateQuery = {date: new Date(date)};
    const result = await Task.updateOne(filter3,updateQuery);

    if(result){
        res.status(202).json({message: 'Successfully Edited Date Of Task ID: '+task._id, data: null});
        return;
    }
    else{
        res.status(500).json({message: 'Failed To Edit Date Of The Task, Try Later!', data: null});
        return;
    }
}


export const editPriority = async (req: AuthRequest,res: Response) => {

    const {id,priority} = req.body;

    if(!id || !priority){
        res.status(400).json({message: 'Need Task ID And Priority To Edit The Task Priority!', data: null});
        return;
    }

    let filter1 = {_id: id};
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
        res.status(400).json({message: 'You Can Only Edit Your Tasks!', data: null});
        return;
    }

    let filter3  = {_id: task._id};
    let updateQuery = {priority: priority};
    const result = await Task.updateOne(filter3,updateQuery);

    if(result){
        res.status(202).json({message: 'Successfully Edited Priority Of Task ID: '+task._id, data: null});
        return;
    }
    else{
        res.status(500).json({message: 'Failed To Edit Priority Of The Task, Try Later!', data: null});
        return;
    }
}


export const markAsComplete = async (req: AuthRequest,res: Response) => {

    const id = req.params.id;

    if(!id){
        res.status(400).json({message: 'Need Task ID To Mark It As Complete!', data: null});
        return;
    }

    let filter1 = {_id: id};
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
        res.status(400).json({message: 'You Can Only Edit Your Tasks!', data: null});
        return;
    }

    if(task.status != Status.INCOMPLETE){
        res.status(400).json({message: 'You Can\'t Mark As Complete, Deleted And NotDo Tasks!', data: null});
        return;
    }

    let filter3  = {_id: task._id};
    let updateQuery = {status: Status.COMPLETE};
    const result = await Task.updateOne(filter3,updateQuery);

    if(result){
        res.status(202).json({message: 'Successfully Mark Task ID: '+task._id+' As Complete', data: null});
        return;
    }
    else{
        res.status(500).json({message: 'Failed To Mark Tasks As Complete, Try Later!', data: null});
        return;
    }
}


export const markAsNotDo = async (req: AuthRequest,res: Response) => {

    const id = req.params.id;

    if(!id){
        res.status(400).json({message: 'Need Task ID To Mark It As Not Do!', data: null});
        return;
    }

    let filter1 = {_id: id};
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
        res.status(400).json({message: 'You Can Only Edit Your Tasks!', data: null});
        return;
    }

    if(task.status != Status.INCOMPLETE){
        res.status(400).json({message: 'You Can\'t Mark As Not Do, Deleted And Completed Tasks!', data: null});
        return;
    }

    let filter3  = {_id: task._id};
    let updateQuery = {status: Status.NOTDO};
    const result = await Task.updateOne(filter3,updateQuery);

    if(result){
        res.status(202).json({message: 'Successfully Mark Task ID: '+task._id+' As Not Do', data: null});
        return;
    }
    else{
        res.status(500).json({message: 'Failed To Mark Tasks As Not Do, Try Later!', data: null});
        return;
    }
}


export const markAsInComplete = async (req: AuthRequest,res: Response) => {
    
    const id = req.params.id;

    if(!id){
        res.status(400).json({message: 'Need Task ID To Mark It As Incomplete!', data: null});
        return;
    }

    let filter1 = {_id: id};
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
        res.status(400).json({message: 'You Can Only Edit Your Tasks!', data: null});
        return;
    }

    if(task.status != Status.COMPLETE){
        res.status(400).json({message: 'You Can\'t Mark As InComplete, Delete, Notdo Tasks!', data: null});
        return;
    }

    let filter3  = {_id: task._id};
    let updateQuery = {status: Status.INCOMPLETE};
    const result = await Task.updateOne(filter3,updateQuery);

    if(result){
        res.status(202).json({message: 'Successfully Mark Task ID: '+task._id+' As Incomplete', data: null});
        return;
    }
    else{
        res.status(500).json({message: 'Failed To Mark Tasks As Incomplete, Try Later!', data: null});
        return;
    }
}


export const undoDelete = async (req: AuthRequest,res: Response) => {
    
    const id = req.params.id;

    if(!id){
        res.status(400).json({message: 'Need Task ID To Mark Undo Delete!', data: null});
        return;
    }

    let filter1 = {_id: id};
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
        res.status(400).json({message: 'You Can Only Edit Your Tasks!', data: null});
        return;
    }

    if(task.status != Status.DELETE){
        res.status(400).json({message: 'You Can\'t Only Undo Deleted Tasks!', data: null});
        return;
    }

    let filter3  = {_id: task._id};
    let updateQuery = {status: Status.INCOMPLETE};
    const result = await Task.updateOne(filter3,updateQuery);

    if(result){
        res.status(202).json({message: 'Successfully Undeleted Task ID: '+task._id, data: null});
        return;
    }
    else{
        res.status(500).json({message: 'Failed To Undelete Tasks, Try Later!', data: null});
        return;
    }
}


export const getAllTasks = async (req: AuthRequest,res: Response) => {

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

    const dayAfter7Days = new Date();
    dayAfter7Days.setDate(dayAfter7Days.getDate() + 6);

    const end = dayAfter7Days.setHours(23, 59, 59, 999);

    let filter2 = {userId: user._id, date: {$gt: end}}
    const allTasks = await Task.find(filter2);

    res.status(202).json({message: 'Successfully Load All Tasks', data: allTasks});
    return;
}


export const getTodayTasks = async (req: AuthRequest,res: Response) => {

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

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let filter2 = {userId: user._id, date: {$gte: startOfDay, $lte: endOfDay}}
    const allTasks = await Task.find(filter2);

    res.status(202).json({message: 'Successfully Load Today Tasks', data: allTasks});
    return;
}


export const getNext7DaysTasks = async (req: AuthRequest,res: Response) => {

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

    const next7daysTasks = [];
    for (let i = 0; i < 7; i++) {

        const d = new Date();
        d.setDate(d.getDate() + i);

        const startOfDay = d.setHours(0, 0, 0, 0);
        const endOfDay = d.setHours(23, 59, 59, 999);

        let filter2 = {userId: user._id, date: {$gte: startOfDay, $lte: endOfDay}}
        const tasks = await Task.find(filter2);

        next7daysTasks.push(tasks);
    }

    res.status(202).json({message: 'Successfully Load Next 7 Days Tasks', data: next7daysTasks});
    return;
}


export const getOtherTasks = async (req: AuthRequest,res: Response) => {

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

    const dayAfter7Days = new Date();
    dayAfter7Days.setDate(dayAfter7Days.getDate() + 6);

    const end = dayAfter7Days.setHours(23, 59, 59, 999);

    let filter2 = {userId: user._id, date: {$gt: end}}
    const otherTasks = await Task.find(filter2);

    res.status(202).json({message: 'Successfully Load Other Tasks', data: otherTasks});
    return;
}


export const getOverdueTasks = async (req: AuthRequest,res: Response) => {

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

    const today = new Date();
    const todayStart = today.setHours(0, 0, 0, 0);

    let filter2 = {userId: user._id, date: {$lt: todayStart}, status: Status.INCOMPLETE}
    const overdueTasks = await Task.find(filter2);

    res.status(202).json({message: 'Successfully Load Overdue Tasks', data: overdueTasks});
    return;
}


export const getDeletedTasks = async (req: AuthRequest,res: Response) => {

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

    let filter2 = {userId: user._id, status: Status.DELETE}
    const deletedTasks = await Task.find(filter2);

    res.status(202).json({message: 'Successfully Load All Deleted Tasks', data: deletedTasks});
    return;
}


export const getNotDoTasks = async (req: AuthRequest,res: Response) => {

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

    let filter2 = {userId: user._id, status: Status.NOTDO}
    const notdoTasks = await Task.find(filter2);

    res.status(202).json({message: 'Successfully Load All Not Do Tasks', data: notdoTasks});
    return;
}


export const getCompleteTasks = async (req: AuthRequest,res: Response) => {

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

    const filter2 = {userId: user._id, status: Status.COMPLETE};
    const filter3 = {date: true, _id: false};
    const dateList = await Task.find(filter2,filter3).sort({date: 'asc'});

    const uniqueDates = [
        ...new Map(
        dateList.map(item => [item.date.toISOString().split('T')[0], item])
        ).values()
        ];

    const completeTasksWithDates = [];
    for (let i = 0; i < uniqueDates.length; i++) {
        const e = uniqueDates[i];

        let filter4 = {userId: user._id, date: e.date, status: Status.COMPLETE}
        const t = await Task.find(filter4);
        
        const element = {i: {date: e.date, tasks: t}};
        completeTasksWithDates.push(element);
    }

    res.status(202).json({message: 'Successfully Load All Complete Tasks', data: completeTasksWithDates});
    return;
}


export const getTasksByDate = async (req: AuthRequest,res: Response) => {

    const date = req.params.date;

    if(!date){
        res.status(401).json({message: 'Date Is Require To Get Tasks On That Day!', data: null});
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
        
    let filter2 = {userId: user._id, date: new Date(date), status: Status.INCOMPLETE}
    const tasks = await Task.find(filter2);

    res.status(202).json({message: 'Successfully Load Tasks Of Date: '+date, data: tasks});
    return;
}


export const getUrgentTasks = async (req: AuthRequest,res: Response) => {

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

    const filter2 = {userId: user._id,priority: Priority.URGENT, status: Status.INCOMPLETE};
    const filter3 = {date: true}
    const dateList = await Task.find(filter2,filter3).sort({date: 'asc'});

    const uniqueDates = [
        ...new Map(
        dateList.map(item => [item.date.toISOString().split('T')[0], item])
        ).values()
        ];

    const urgentTasksWithDates = [];
    const overdueList = [];
    for (let i = 0; i < uniqueDates.length; i++) {
        const e = uniqueDates[i];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (e.date < today){
            let filter4 = {userId: user._id, date: e.date, priority: Priority.URGENT, status: Status.INCOMPLETE}
            const t = await Task.find(filter4);

            for (let j = 0; j < t.length; j++) {
                overdueList.push(t[j]);   
            }
        }
    }

    urgentTasksWithDates.push({0: {date: 'Overdue', tasks: overdueList}});

    let count = 1;
    for (let i = 0; i < uniqueDates.length; i++) {
        const e = uniqueDates[i];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (e.date >= today){
            let filter5 = {userId: user._id, date: e.date, priority: Priority.URGENT, status: Status.INCOMPLETE}
            const t = await Task.find(filter5);

            urgentTasksWithDates.push({[count]: {date: e.date, tasks: t}});
            count++;
        }
    }

    res.status(202).json({message: 'Successfully Load All Urgent Tasks!', data: urgentTasksWithDates});
    return;
}


export const getNotUrgentTasks = async (req: AuthRequest,res: Response) => {

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

    const filter2 = {userId: user._id,priority: Priority.NOT_URGENT, status: Status.INCOMPLETE};
    const filter3 = {date: true}
    const dateList = await Task.find(filter2,filter3).sort({date: 'asc'});

    const uniqueDates = [
        ...new Map(
        dateList.map(item => [item.date.toISOString().split('T')[0], item])
        ).values()
        ];

    const notUrgentTasksWithDates = [];
    const overdueList = [];
    for (let i = 0; i < uniqueDates.length; i++) {
        const e = uniqueDates[i];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (e.date < today){
            let filter4 = {userId: user._id, date: e.date, priority: Priority.NOT_URGENT, status: Status.INCOMPLETE}
            const t = await Task.find(filter4);

            for (let j = 0; j < t.length; j++) {
                overdueList.push(t[j]);   
            }
        }
    }

    notUrgentTasksWithDates.push({0: {date: 'Overdue', tasks: overdueList}});

    let count = 1;
    for (let i = 0; i < uniqueDates.length; i++) {
        const e = uniqueDates[i];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (e.date >= today){
            let filter5 = {userId: user._id, date: e.date, priority: Priority.NOT_URGENT, status: Status.INCOMPLETE}
            const t = await Task.find(filter5);

            notUrgentTasksWithDates.push({[count]: {date: e.date, tasks: t}});
            count++;
        }
    }

    res.status(202).json({message: 'Successfully Load All Not Urgent Tasks!', data: notUrgentTasksWithDates});
    return;
}


export const getImportantTasks = async (req: AuthRequest,res: Response) => {

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

    const filter2 = {userId: user._id,priority: Priority.IMPORTANT, status: Status.INCOMPLETE};
    const filter3 = {date: true}
    const dateList = await Task.find(filter2,filter3).sort({date: 'asc'});

    const uniqueDates = [
        ...new Map(
        dateList.map(item => [item.date.toISOString().split('T')[0], item])
        ).values()
        ];

    const importantTasksWithDates = [];
    const overdueList = [];
    for (let i = 0; i < uniqueDates.length; i++) {
        const e = uniqueDates[i];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (e.date < today){
            let filter4 = {userId: user._id, date: e.date, priority: Priority.IMPORTANT, status: Status.INCOMPLETE}
            const t = await Task.find(filter4);

            for (let j = 0; j < t.length; j++) {
                overdueList.push(t[j]);   
            }
        }
    }

    importantTasksWithDates.push({0: {date: 'Overdue', tasks: overdueList}});

    let count = 1;
    for (let i = 0; i < uniqueDates.length; i++) {
        const e = uniqueDates[i];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (e.date >= today){
            let filter5 = {userId: user._id, date: e.date, priority: Priority.IMPORTANT, status: Status.INCOMPLETE}
            const t = await Task.find(filter5);

            importantTasksWithDates.push({[count]: {date: e.date, tasks: t}});
            count++;
        }
    }

    res.status(202).json({message: 'Successfully Load All Important Tasks!', data: importantTasksWithDates});
    return;
}


export const getUnimportantTasks = async (req: AuthRequest,res: Response) => {

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

    const filter2 = {userId: user._id,priority: Priority.UNIMPORTANT, status: Status.INCOMPLETE};
    const filter3 = {date: true}
    const dateList = await Task.find(filter2,filter3).sort({date: 'asc'});

    const uniqueDates = [
        ...new Map(
        dateList.map(item => [item.date.toISOString().split('T')[0], item])
        ).values()
        ];

    const unimportantTasksWithDates = [];
    const overdueList = [];
    for (let i = 0; i < uniqueDates.length; i++) {
        const e = uniqueDates[i];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (e.date < today){
            let filter4 = {userId: user._id, date: e.date, priority: Priority.UNIMPORTANT, status: Status.INCOMPLETE}
            const t = await Task.find(filter4);

            for (let j = 0; j < t.length; j++) {
                overdueList.push(t[j]);   
            }
        }
    }

    unimportantTasksWithDates.push({0: {date: 'Overdue', tasks: overdueList}});

    let count = 1;
    for (let i = 0; i < uniqueDates.length; i++) {
        const e = uniqueDates[i];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (e.date >= today){
            let filter5 = {userId: user._id, date: e.date, priority: Priority.UNIMPORTANT, status: Status.INCOMPLETE}
            const t = await Task.find(filter5);

            unimportantTasksWithDates.push({[count]: {date: e.date, tasks: t}});
            count++;
        }
    }

    res.status(202).json({message: 'Successfully Load All Unimportant Tasks!', data: unimportantTasksWithDates});
    return;
}