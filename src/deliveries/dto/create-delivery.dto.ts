import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatus } from '../entities/delivery.entity';

export class CreateDeliveryDto {
    @ApiProperty({ example: 1 })
    order_id: number;

    @ApiProperty({ example: '2023-10-27T10:00:00Z', required: false })
    pickup_time?: Date;

    @ApiProperty({ example: 'John Agent' })
    delivery_agent: string;

    @ApiProperty({ enum: DeliveryStatus, default: DeliveryStatus.SCHEDULED, required: false })
    status?: DeliveryStatus;
}
