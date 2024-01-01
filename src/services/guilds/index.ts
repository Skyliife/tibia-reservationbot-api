import axios from 'axios';
import {DISCORD_API_URL} from "../../utils/constants";
import {PartialGuild} from "../../utils/types";
import {User} from "../../database/schemas";

export function getBotGuildsService() {
    const TOKEN = process.env.DISCORD_CLIENT_TOKEN!;
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bot ${TOKEN}`
        }
    });
}

export async function getUserGuildsService(id: string) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    });
}