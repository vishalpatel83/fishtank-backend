import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
    @ApiProperty({ example: 1 })
    lot_id: number;

    @ApiProperty({ example: 1 })
    buyer_id: number;

    @ApiProperty({ example: 10.5 })
    quantity_kg: number;

    @ApiProperty({ example: 105.0 })
    total_price: number;

    @ApiProperty({ enum: OrderStatus, default: OrderStatus.PENDING, required: false })
    status?: OrderStatus;
}
