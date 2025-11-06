import express from "express";
import { authorization } from "../middlewares/authorization";
import { addPromo, getTotalPromo, getTodayPromo, getTotalTime, getTodayTime, getTodayPromoList, getPromoByDate, getTimeByDate } from "../controllers/promoController";
import { Role } from "../models/userModel";

const router = express.Router();

router.post('/add',authorization([Role.USER]),addPromo);

router.get('/total',authorization([Role.USER]),getTotalPromo);

router.get('/today',authorization([Role.USER]),getTodayPromo);

router.get('/total/time',authorization([Role.USER]),getTotalTime);

router.get('/today/time',authorization([Role.USER]),getTodayTime);

router.get('/today/promo/list',authorization([Role.USER]),getTodayPromoList);

router.get('/bydate/:date',authorization([Role.USER]),getPromoByDate);

router.get('/time/bydate/:date',authorization([Role.USER]),getTimeByDate);

export default router;