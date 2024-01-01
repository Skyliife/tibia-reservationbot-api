import passport from "passport";
import {Profile, Strategy} from "passport-discord";
import {VerifyCallback} from "passport-oauth2";
import {User} from "../database/schemas";

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        return user ? done(null, user) : done(null, null);
    } catch (error) {
        console.log(error);
        return done(error as any, null);
    }
});

passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: process.env.DISCORD_CALLBACK_URL!,
            scope: ['identify', 'guilds', 'email']
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            console.log("accessToken", accessToken);
            console.log("refreshToken", refreshToken);
            console.log("profile", profile);
            const {id: discordId} = profile;
            try {
                const existingUser = await User.findOneAndUpdate(
                    {discordId},
                    {accessToken, refreshToken},
                    {new: true}
                );
                if (existingUser) {
                    console.log("Existing user found!");
                    return done(null, existingUser);
                }
                const newUser = new User({discordId, accessToken, refreshToken});
                const savedUser = await newUser.save();
                return done(null, savedUser);
            } catch (error) {
                console.log(error);
                return done(error as any, undefined);
            }
        }
    )
);