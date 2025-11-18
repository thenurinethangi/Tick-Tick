import express, {Request,Response,NextFunction} from 'express'
import { signup, signin, adminRegister, changePassword } from '../controllers/authController';
import { authentication } from '../middlewares/authentication';
import { authorization } from '../middlewares/authorization';
import { Role } from '../models/userModel';

const router = express.Router();

router.post('/signup',signup);

router.post('/signin',signin);

router.post('/admin/register',authentication,authorization([Role.ADMIN]),adminRegister);

router.post('/change/password',changePassword);

export default router;