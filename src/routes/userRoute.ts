import express from 'express'
import { authorization } from '../middlewares/authorization';
import { getUserDetails } from '../controllers/userController';
import { Role } from '../models/userModel';

const router = express.Router();

router.get('/data',authorization([Role.USER,Role.ADMIN]),getUserDetails);

export default router;