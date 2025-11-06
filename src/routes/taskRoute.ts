import express from 'express'
import { addTask, deleteTask, editDate, editPriority, getAllTasks, getTodayTasks, getNext7DaysTasks, getOtherTasks, getOverdueTasks, markAsComplete, markAsNotDo, markAsInComplete, undoDelete, getDeletedTasks, getNotDoTasks, getCompleteTasks, getTasksByDate, getUrgentTasks, getNotUrgentTasks, getImportantTasks, getUnimportantTasks } from '../controllers/taskController';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.post('/add',authentication,addTask);

router.delete('/delete/:id',authentication,deleteTask);

router.put('/edit/date',authentication,editDate);

router.put('/edit/priority',authentication,editPriority);

router.put('/edit/markAsComplete/:id',authentication,markAsComplete);

router.put('/edit/markAsNotDo/:id',authentication,markAsNotDo);

router.put('/edit/markAsIncomplete/:id',authentication,markAsInComplete);

router.put('/undoDelete/:id',authentication,undoDelete);

router.get('/all',authentication,getAllTasks);

router.get('/today',authentication,getTodayTasks);

router.get('/next7days',authentication,getNext7DaysTasks);

router.get('/other',authentication,getOtherTasks);

router.get('/overdue',authentication,getOverdueTasks);

router.get('/all/delete',authentication,getDeletedTasks);

router.get('/all/notdo',authentication,getNotDoTasks);

router.get('/all/complete',authentication,getCompleteTasks);

router.get('/all/bydate/:date',authentication,getTasksByDate);

router.get('/all/urgent',authentication,getUrgentTasks);

router.get('/all/notUrgent',authentication,getNotUrgentTasks);

router.get('/all/important',authentication,getImportantTasks);

router.get('/all/unimportant',authentication,getUnimportantTasks);

export default router;