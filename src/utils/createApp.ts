import express, {Express} from "express";
import cors from "cors";
import session from "express-session";
import routes from "../routes";

export function createApp(): Express {
    const app = express();

    // Enable Parsing Middleware for requests
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // Enable CORS
    app.use(
        cors({
            origin: ['http://localhost:3000'],
            credentials: true
        })
    );

    // Enable Session
    app.use(session({
        secret:"asdfasdfasdfasdf",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 24 * 7 * 1000,
        }
    }));

    // Enable Routes
    app.use('/api', routes);
    return app;
}