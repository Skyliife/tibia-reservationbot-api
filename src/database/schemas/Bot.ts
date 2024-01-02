import mongoose, {Schema} from "mongoose";

export interface IBot {
    accessToken: string;
}

const BotSchema = new Schema<IBot>({
    accessToken: {type: String, required: true, unique: true},
});

export default mongoose.model('bots', BotSchema);