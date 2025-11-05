import express from 'express'
import { addTask, deleteTask } from '../controllers/taskController';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.post('/add',authentication,addTask);
router.delete('/delete/:id',authentication,deleteTask);

export default router;