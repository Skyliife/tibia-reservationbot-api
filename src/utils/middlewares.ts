import {NextFunction, Request, Response} from "express";
import passport from "passport";

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => req.user ? next() : res.sendStatus(403);

export const authenticateBot = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('bearer', {session: false}, (err: any, user: any) => {
        if (err) {
            console.log(err);
            res.sendStatus(403)
        }

        if (!user) {

            console.log('Authentication failed');
            next();

        }
        next();
    })(req, res, next);
};