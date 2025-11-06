import express from 'express'
import { addTask, deleteTask, editDate, editPriority, getAllTasks, getTodayTasks, getNext7DaysTasks, getOtherTasks, getOverdueTasks, markAsComplete, markAsNotDo, markAsInComplete, undoDelete, getDeletedTasks, getNotDoTasks, getCompleteTasks, getTasksByDate, getUrgentTasks, getNotUrgentTasks, getImportantTasks, getUnimportantTasks } from '../controllers/taskController';
import { authorization } from '../middlewares/authorization';
import { Role } from '../models/userModel';

const router = express.Router();

router.post('/add',authorization([Role.USER]),addTask);

router.delete('/delete/:id',authorization([Role.USER]),deleteTask);

router.put('/edit/date',authorization([Role.USER]),editDate);

router.put('/edit/priority',authorization([Role.USER]),editPriority);

router.put('/edit/markAsComplete/:id',authorization([Role.USER]),markAsComplete);

router.put('/edit/markAsNotDo/:id',authorization([Role.USER]),markAsNotDo);

router.put('/edit/markAsIncomplete/:id',authorization([Role.USER]),markAsInComplete);

router.put('/undoDelete/:id',authorization([Role.USER]),undoDelete);

router.get('/all',authorization([Role.USER]),getAllTasks);

router.get('/today',authorization([Role.USER]),getTodayTasks);

router.get('/next7days',authorization([Role.USER]),getNext7DaysTasks);

router.get('/other',authorization([Role.USER]),getOtherTasks);

router.get('/overdue',authorization([Role.USER]),getOverdueTasks);

router.get('/all/delete',authorization([Role.USER]),getDeletedTasks);

router.get('/all/notdo',authorization([Role.USER]),getNotDoTasks);

router.get('/all/complete',authorization([Role.USER]),getCompleteTasks);

router.get('/all/bydate/:date',authorization([Role.USER]),getTasksByDate);

router.get('/all/urgent',authorization([Role.USER]),getUrgentTasks);

router.get('/all/notUrgent',authorization([Role.USER]),getNotUrgentTasks);

router.get('/all/important',authorization([Role.USER]),getImportantTasks);

router.get('/all/unimportant',authorization([Role.USER]),getUnimportantTasks);

export default router;