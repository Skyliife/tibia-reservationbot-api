import {Request, Response} from 'express';
import {getBotGuildsService, getUserGuildsService} from "../../services/guilds";
import {IUser} from "../../database/schemas/User";

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as IUser;
    try {
        const {data: botGuilds} = await getBotGuildsService();
        const {data: userGuilds} = await getUserGuildsService(user.id);
        res.send({botGuilds, userGuilds});
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}