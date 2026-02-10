import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: '1234567890', required: false })
    mobile_number?: string;

    @ApiProperty({ example: '06355715258', required: false })
    phone?: string;

    @ApiProperty({ example: 'john@example.com' })
    email: string;

    @ApiProperty({ example: 'password123' })
    password: string;

    @ApiProperty({ example: 'password123' })
    confirmPassword?: string;

    @ApiProperty({ example: '564564564564', required: false })
    aadhaar_number?: string;

    @ApiProperty({ example: 'A13, Gayatri kunj society...', required: false })
    address?: string;

    @ApiProperty({ example: '45646456456456456', required: false })
    bank_account_no?: string;

    @ApiProperty({ example: 'SBIN0003434', required: false })
    ifsc_code?: string;

    @ApiProperty({ example: 'Ahmedabad', required: false })
    location?: string;

    @ApiProperty({
        enum: UserRole,
        example: UserRole.FISHERMAN,
    })
    role: UserRole | string;

    @ApiProperty({
        enum: UserStatus,
        example: UserStatus.PENDING,
        required: false,
    })
    status?: UserStatus;
}
