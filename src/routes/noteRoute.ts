import express from 'express'
import { addNote } from '../controllers/noteController';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.post('/add',authentication,addNote);

export default router;