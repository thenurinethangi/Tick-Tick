import express from 'express'
import { sendEmailWithOtp } from '../controllers/emailController';

const router = express();

router.post('/otp',sendEmailWithOtp);

export default router;