import express from "express";
import { authentication } from "../middlewares/authentication";
import { addPromo } from "../controllers/promoController";

const router = express.Router();

router.post('/add',authentication,addPromo);

export default router;