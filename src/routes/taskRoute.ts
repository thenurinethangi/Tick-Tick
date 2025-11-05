import express from 'express'
import { addTask } from '../controllers/taskController';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.post('/add',authentication,addTask);

export default router;