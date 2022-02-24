import { 
    Body,
    Controller,
    Get,
    Post,
    Query,
    Route,
    SuccessResponse
 } from 'tsoa';


import { User } from './users';
import { UsersService, UserCreationParams } from './usersService';

@Route("users")
export class UsersController extends Controller {
    /**
     * Retrieves the details of an existing user.
     * Supply the unique user ID from either and recieve the corresponding user details.
     * @param userId The user's identifier
     * @param name Provide a username to display
     */
    @Get("{userId}")
    public async getUser (
        @Query() name: string
    ): Promise<User> {
        return new UsersService().get(name);
    }

    /**
     * Posts a user to the database.
     * @param requestBody The user to create. Requires a name, an email, and a phone number.
     */
    @SuccessResponse("201", "Created")
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201);
        new UsersService().create(requestBody);
        return;
    }
}