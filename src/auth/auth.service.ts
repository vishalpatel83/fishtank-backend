import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dtos/auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private usersService: UsersService) { }

    // Basic validation logic following the pattern
    async validateUser({ username, password }: AuthPayloadDto) {
        // For now, using a placeholder check or link to a real user service
        // In daybookbackend, it uses userRepository.
        // This is a common pattern to be extended later.
        if (username === 'admin' && password === 'admin') {
            const payload = { username, id: 1 };
            return {
                accessToken: this.jwtService.sign(payload),
                refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async refreshToken(user: any) {
        const payload = { username: user.username, id: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    //  async validateUser({ username, password }: AuthPayloadDto) {
    //     // For now, using a placeholder check or link to a real user service
    //     // In daybookbackend, it uses userRepository.
    //     // This is a common pattern to be extended later.
    //      const user = await this.usersService.findByUsername(username);

    //      console.log(user);
    //      console.log(password);
    //      console.log(await bcrypt.compare(password, user?.password_hash));

    //     if (user && (await bcrypt.compare(password, user.password_hash))) {
    //         const { password_hash, ...result } = user;
    //         const payload = { username: user.email, id: user.id, role: user.role };
    //         return {
    //             accessToken: this.jwtService.sign(payload),
    //             refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    //             user: result,
    //         };
    //     }
    //     throw new UnauthorizedException('Invalid credentials');
    // }
}
