import passport from "passport";
import {Strategy} from 'passport-http-bearer';
import {Bot} from "../database/schemas";

const validApiKeys = ['1234'];

passport.serializeUser((bot: any, done) => {
    console.log("serializeUser", bot);
    return done(null, bot.id);
});

passport.use(
    new Strategy(async (token, done) => {

        try {
            console.log("try authentication via api key");
            if (!validApiKeys.includes(token)) return done(null, false);
            const existingBot = await Bot.findOne(
                {accessToken: token}
            );
            if (existingBot) {
                console.log("Existing Bot found!");
                return done(null, existingBot);
            }
            const newBot = new Bot({accessToken: token});
            const savedBot = newBot.save();
            return done(null, savedBot);

        } catch (error) {
            console.log(error);
            return done(error as any, undefined);
        }
    })
);