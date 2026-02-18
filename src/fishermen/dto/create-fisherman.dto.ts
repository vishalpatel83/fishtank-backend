import {
  Length,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FishermanStatus } from '../entities/fisherman.entity';

export class CreateFishermanDto {
  // ── Common fields (forwarded to users table) ──

  @ApiProperty({ example: 'John Doe', description: 'Full name' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail()
  @Length(1, 150)
  email: string;

  @ApiProperty({ example: '+91-9876543210', description: 'Phone number' })
  @IsNotEmpty()
  @IsString()
  @Length(10, 15)
  phone: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  password: string;

  @ApiProperty({ example: '123 Harbor Road', description: 'Address', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Port City', description: 'Location', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  location?: string;

  @ApiProperty({ example: '123456789012', description: 'Aadhaar number', required: false })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  aadhaar_number?: string;

  @ApiProperty({ example: '12345678901234', description: 'Bank account number', required: false })
  @IsOptional()
  @IsString()
  @Length(5, 30)
  bank_account_no?: string;

  @ApiProperty({ example: 'BANK0001234', description: 'IFSC code', required: false })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  ifsc_code?: string;

  // ── Fisherman-specific fields ──

  @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'Profile photo URL', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  profile_photo?: string;

  @ApiProperty({ example: false, description: 'Whether the fisherman is verified', required: false })
  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @ApiProperty({ enum: FishermanStatus, example: FishermanStatus.PENDING, description: 'Fisherman status', required: false })
  @IsOptional()
  @IsEnum(FishermanStatus)
  status?: FishermanStatus;
}
