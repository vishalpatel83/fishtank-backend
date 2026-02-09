import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityStatus } from '../entities/delivery-partner.entity';

export class CreateDeliveryPartnerDto {
    @ApiProperty({ example: 1 })
    user_id: number;

    @ApiProperty({ enum: AvailabilityStatus, default: AvailabilityStatus.OFFLINE, required: false })
    availability_status?: AvailabilityStatus;
}
