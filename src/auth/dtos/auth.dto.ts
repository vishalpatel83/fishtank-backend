import { IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class AuthTokenPayloadDTO {
    id: number;
    username: string;
}
