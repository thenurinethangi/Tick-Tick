import express from "express";
import { authentication } from "../middlewares/authentication";
import { addPromo, getTotalPromo, getTodayPromo, getTotalTime, getTodayTime, getTodayPromoList, getPromoByDate, getTimeByDate } from "../controllers/promoController";

const router = express.Router();

router.post('/add',authentication,addPromo);

router.get('/total',authentication,getTotalPromo);

router.get('/today',authentication,getTodayPromo);

router.get('/total/time',authentication,getTotalTime);

router.get('/today/time',authentication,getTodayTime);

router.get('/today/promo/list',authentication,getTodayPromoList);

router.get('/bydate/:date',authentication,getPromoByDate);

router.get('/time/bydate/:date',authentication,getTimeByDate);

export default router;