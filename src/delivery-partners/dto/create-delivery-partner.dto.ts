import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityStatus } from '../entities/delivery-partner.entity';

export class CreateDeliveryPartnerDto {
    // ── Common fields (forwarded to users table) ──

    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    email: string;

    @ApiProperty({ example: '1234567890' })
    phone: string;

    @ApiProperty({ example: 'password123' })
    password: string;

    @ApiProperty({ example: '123 Main St', required: false })
    address?: string;

    // ── Delivery Partner-specific fields ──

    @ApiProperty({ enum: AvailabilityStatus, default: AvailabilityStatus.OFFLINE, required: false })
    availability_status?: AvailabilityStatus;
}
