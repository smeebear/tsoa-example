import { Schema, model, Document } from "mongoose";

import { User } from './users'

const UsersSchema = new Schema<User>({
    email: { type: String, required: true },
    // id: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String },
    phoneNumbers: { type: [String], required: true }
})

const Users = model<User>('Users', UsersSchema);
interface UserDoc extends User, Document {}

export { Users, UserDoc }