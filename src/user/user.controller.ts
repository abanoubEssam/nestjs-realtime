import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService){}
    @Post('/create')
    async login(@Req() req: Request) {
      return await this._userService.createUser(req.body)
    }
}
