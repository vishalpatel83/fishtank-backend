import {
  Length,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum FishermanStatus {
  ACTIVE = 'Active',
  SUSPENDED = 'Suspended',
  PENDING = 'Pending',
}

export enum FishermanRole {
  ADMIN = 'admin',
  FISHERMAN = 'fisherman',
  BUYER = 'buyer',
  DELIVERYMAN = 'deliveryman',
}

export class CreateFishermanDto {
  @ApiProperty()
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

  @ApiProperty({ example: 'password123', description: 'Password hash' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  password_hash: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 'Port City', description: 'Location' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  location: string;

  @ApiProperty({ example: '12345678901234', description: 'Aadhaar number' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  aadhaar_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  bank_account_no: string;

  @ApiProperty({ example: 'BANK0001234', description: 'IFSC code' })
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  ifsc_code: string;

  // @ApiPropertyOptional({ example: 'https://example.com/photo.jpg', description: 'Profile photo URL' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  profile_photo?: string;

  // @ApiPropertyOptional({ example: '2024-01-25T10:00:00Z', description: 'Registration date' })
  @IsOptional()
  @IsDateString()
  registered_at?: Date;

  // @ApiPropertyOptional({ example: false, description: 'Whether the fisherman is verified' })
  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  // @ApiPropertyOptional({ enum: FishermanStatus, example: FishermanStatus.ACTIVE, description: 'Fisherman status' })
  @IsOptional()
  @IsEnum(FishermanStatus)
  status?: FishermanStatus;

  @ApiProperty({ enum: FishermanRole, example: FishermanRole.FISHERMAN, description: 'Fisherman role' })
  @IsOptional()
  @IsEnum(FishermanRole)
  role?: FishermanRole;
}
