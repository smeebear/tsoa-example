import { Users, UserDoc } from "./usersModel";
import { User } from './users'

export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">

export class UsersService {
    public async get(name: string): Promise<UserDoc> {
        try {
            let user: UserDoc | null = await Users.findOne({ name: name }).exec()
            if (user === null) throw "Couldn't find a user"
            return user;
        } catch (err) {
            throw err
        }
    }

    public create(userCreationParams: UserCreationParams) {
        return
    }
}