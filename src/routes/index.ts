import {Router} from "express";
import authRouter from "./auth";
import guildsRouter from "./guilds";
import dataRouter from "./data";
import {authenticateBot, isAuthenticated} from "../utils/middlewares";

const router = Router();

router.use('/auth', authRouter);
router.use('/guilds', guildsRouter);
router.use('/data', authenticateBot, isAuthenticated, dataRouter);

export default router;