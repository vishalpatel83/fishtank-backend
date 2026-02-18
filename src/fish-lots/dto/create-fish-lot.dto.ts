import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
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

    @ApiPropertyOptional({ description: 'Date when the fish was caught', example: '2026-02-15' })
    @IsOptional()
    @IsDateString()
    catchDate: string;

    @ApiPropertyOptional({ description: 'Location where the fish was caught', example: 'Mumbai Harbor' })
    @IsOptional()
    @IsString()
    catchLocation: string;

    @ApiPropertyOptional({ description: 'Additional notes about the lot' })
    @IsOptional()
    @IsString()
    notes: string;

    @ApiPropertyOptional({ description: 'Quality grade of the lot', example: 'A' })
    @IsOptional()
    @IsString()
    qualityGrade: string;
}
