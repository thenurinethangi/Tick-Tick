import express from 'express'
import { addNote, deleteNote, editNote, getAllNotes } from '../controllers/noteController';
import { authorization } from '../middlewares/authorization';
import { Role } from '../models/userModel';

const router = express.Router();

router.post('/add',authorization([Role.USER]),addNote);

router.delete('/delete/:id',authorization([Role.USER]),deleteNote);

router.put('/edit',authorization([Role.USER]),editNote);

router.get('/all',authorization([Role.USER]),getAllNotes);

export default router;