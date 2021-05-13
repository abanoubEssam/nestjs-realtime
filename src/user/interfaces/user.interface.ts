import { Document } from "mongoose";

export interface User extends Document {
    email: string
    name: string
    password: string
}
