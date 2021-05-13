import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) { }


    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this._authService.login(req.user);
    }

    @Post('/sign-up')
    async register(@Req() req: Request) {
        return await this._authService.createUser(req.body)
    }

}
