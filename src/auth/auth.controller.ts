import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dtos/auth.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ResultModal } from '../common/result';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    async login(@Body() authPayload: AuthPayloadDto) {
        const data = await this.authService.validateUser(authPayload);
        return new ResultModal(data, 'Login successful', 200, true, '').result;
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Get('status')
    @ApiOperation({ summary: 'Get current user status' })
    async getStatus(@Request() req) {
        return new ResultModal(req.user, 'User status retrieved', 200, true, '').result;
    }
}
