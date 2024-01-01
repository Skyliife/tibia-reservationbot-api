import mongoose, {Schema} from "mongoose";

export interface IUser {
    id: string;
    discordId: string;
    accessToken: string;
    refreshToken: string;
}

const UserSchema = new Schema<IUser>({
    discordId: {type: String, required: true, unique: true},
    accessToken: {type: String, required: true},
    refreshToken: {type: String, required: true},
});

export default mongoose.model('users', UserSchema);