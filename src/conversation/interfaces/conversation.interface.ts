import { Document } from "mongoose";
import { User } from "src/user/interfaces/user.interface";

export interface Conversation extends Document {
    participants: string[] | User[];
}
