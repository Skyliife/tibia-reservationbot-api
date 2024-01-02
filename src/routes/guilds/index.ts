import {Router} from "express";
import {isAuthenticated} from "../../utils/middlewares";
import {getGuildsController} from "../../controllers/user/guilds";

const router = Router();

router.get('/', isAuthenticated, getGuildsController);

export default router;