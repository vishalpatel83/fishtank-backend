import { ApiProperty } from '@nestjs/swagger';

export class CreateBuyerDto {
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

    // ── Buyer-specific fields ──

    @ApiProperty({ example: 'Doe Fisheries', required: false })
    company_name?: string;

    @ApiProperty({ example: '22AAAAA0000A1Z5', required: false })
    gst_number?: string;
}
