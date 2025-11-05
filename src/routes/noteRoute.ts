import express from 'express'
import { addNote, deleteNote, editNote } from '../controllers/noteController';
import { authentication } from '../middlewares/authentication';

const router = express.Router();

router.post('/add',authentication,addNote);

router.delete('/delete/:id',authentication,deleteNote);

router.put('/edit',authentication,editNote);

export default router;