import express from "express";
import { authentication } from "../middlewares/authentication";
import { addPromo, getTotalPromo, getTodayPromo, getTotalTime } from "../controllers/promoController";

const router = express.Router();

router.post('/add',authentication,addPromo);

router.get('/total',authentication,getTotalPromo);

router.get('/today',authentication,getTodayPromo);

router.get('/total/time',authentication,getTotalTime);

export default router;