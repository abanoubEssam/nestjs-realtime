import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user';
import { User } from './interfaces/user.interface';

@ApiBearerAuth()
@ApiTags("Users")
@Controller('user')
export class UserController {

    @Get('/profile')
    async login(
        @CurrentUser() user: User
    ) {
        return user;
    }
}
