import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { FishLotStatus } from '../entities/fish-lot.entity';

export class CreateFishLotDto {
    @ApiProperty({ description: 'ID of the fisherman who added the lot' })
    @IsNumber()
    @IsNotEmpty()
    fisherman_id: number;

    @ApiProperty({ description: 'Type of fish', example: 'Rohu' })
    @IsString()
    @IsNotEmpty()
    fish_type: string;

    @ApiProperty({ description: 'Total available weight in kg', example: 50.5 })
    @IsNumber()
    @IsNotEmpty()
    weight_kg: number;

    @ApiProperty({ description: 'Offered price per kg', example: 120 })
    @IsNumber()
    @IsNotEmpty()
    price_per_kg: number;

    @ApiProperty({
        description: 'Status of the lot',
        enum: FishLotStatus,
        default: FishLotStatus.AVAILABLE,
    })
    @IsEnum(FishLotStatus)
    status: FishLotStatus;
}
