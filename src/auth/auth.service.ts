import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

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
}
