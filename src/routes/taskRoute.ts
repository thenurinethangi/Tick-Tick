import express from 'express'
import { addTask, deleteTask, editDate, editPriority, getAllTasks, getTodayTasks, getNext7DaysTasks, getOtherTasks, getOverdueTasks, markAsComplete, markAsNotDo, markAsInComplete, undoDelete } from '../controllers/taskController';
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

export default router;