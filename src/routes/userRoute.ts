import express from 'express'
import { authentication } from '../middlewares/authentication';
import { getUserDetails } from '../controllers/userController';

const router = express.Router();

router.get('/data',authentication,getUserDetails);

export default router;