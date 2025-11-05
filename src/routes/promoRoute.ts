import express from "express";
import { authentication } from "../middlewares/authentication";
import { addPromo, getTotalPromo, getTodayPromo, getTotalTime, getTodayTime } from "../controllers/promoController";

const router = express.Router();

router.post('/add',authentication,addPromo);

router.get('/total',authentication,getTotalPromo);

router.get('/today',authentication,getTodayPromo);

router.get('/total/time',authentication,getTotalTime);

router.get('/today/time',authentication,getTodayTime);

export default router;