import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user';
import { Public } from 'src/shared/decorators/is-public';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags("Users")
@Controller('users')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ){}

    @Public()
    @Get('/')
    async findUsers(
        @CurrentUser() user?: User
    ) {
       return await this._userService.findAllUsers(user)
    }

    @Get('/profile')
    async login(
        @CurrentUser() user: User
    ) {
        return user;
    }


}
