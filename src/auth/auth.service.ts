import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(username: string, password: string): Promise<any> {
        console.log('email', username);
        const user = await this.userService.findOne(username);
        if (!user) {
            return null;
        }
        if (user.password !== password) {
            throw new UnauthorizedException();

        }
        const payload = user;
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
