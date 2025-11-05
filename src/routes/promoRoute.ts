import express from "express";
import { authentication } from "../middlewares/authentication";
import { addPromo, getTotalPromo, getTodayPromo } from "../controllers/promoController";

const router = express.Router();

router.post('/add',authentication,addPromo);

router.get('/total',authentication,getTotalPromo);

router.get('/today',authentication,getTodayPromo);

export default router;