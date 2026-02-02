import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: '1234567890' })
    mobile_number: string;

    @ApiProperty({ example: 'john@example.com' })
    email: string;

    @ApiProperty({ example: 'password123' })
    password: string;

    @ApiProperty({
        enum: UserRole,
        example: UserRole.FISHERMAN,
    })
    role: UserRole;

    @ApiProperty({
        enum: UserStatus,
        example: UserStatus.PENDING,
        required: false,
    })
    status?: UserStatus;
}
