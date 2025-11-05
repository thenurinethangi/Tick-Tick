import express from 'express'
import { addNote, deleteNote } from '../controllers/noteController';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.post('/add',authentication,addNote);

router.delete('/delete/:id',authentication,deleteNote);

export default router;