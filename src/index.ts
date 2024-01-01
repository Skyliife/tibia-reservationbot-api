import {config} from 'dotenv';
import {createApp} from "./utils/createApp";
import './database';

config();


const PORT = process.env.API_PORT || 3001;

async function main() {
    console.log(`Running in ${process.env.API_ENVIRONMENT} mode.`);
    try {
        const app = createApp();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}.`);
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

main();