import express from 'express'
import { addTask, deleteTask, editDate, editPriority } from '../controllers/taskController';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.post('/add',authentication,addTask);
router.delete('/delete/:id',authentication,deleteTask);
router.put('/edit/date',authentication,editDate);
router.put('/edit/priority',authentication,editPriority);

export default router;