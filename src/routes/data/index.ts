import {Router} from "express";
import huntingplaces from "./huntingplaces";

const router = Router();

router.use('/huntingplaces', huntingplaces);

export default router;