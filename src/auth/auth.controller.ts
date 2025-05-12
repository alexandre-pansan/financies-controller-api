import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    //just checking if commit is working

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    signIn(@Body() signInDto: Record<string, any>) {
        console.log('signInDto', signInDto);
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
