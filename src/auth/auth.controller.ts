import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dtos/sign-up.dto';
import { LoginDto } from './dtos/login.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) { }


    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(
        @Request() req,
        @Body() loginDto: LoginDto
    ) {
        return this._authService.login(req.user);
    }

    @Post('/sign-up')
    async register(@Body() signUpDto: SignUpDto) {
        return await this._authService.createUser(signUpDto)
    }

}
