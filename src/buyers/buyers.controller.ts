import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import type { Response } from 'express';
import { ResultModal } from '../common/result';

@ApiTags('buyers')
@Controller('buyers')
export class BuyersController {
    constructor(private readonly buyersService: BuyersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new buyer' })
    @ApiBody({ type: CreateBuyerDto })
    @ApiResponse({ status: 201, description: 'Buyer created successfully' })
    async create(@Body() createBuyerDto: CreateBuyerDto, @Res() res: Response) {
        try {
            const data = await this.buyersService.create(createBuyerDto);
            const result = new ResultModal(
                data,
                'Buyer created successfully',
                HttpStatus.CREATED,
                true,
                '',
            ).result;
            return res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to create buyer',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all buyers' })
    @ApiResponse({ status: 200, description: 'List of all buyers retrieved' })
    async findAll(@Res() res: Response) {
        try {
            const data = await this.buyersService.findAll();
            const result = new ResultModal(
                data,
                'Buyers retrieved successfully',
                HttpStatus.OK,
                true,
                '',
            ).result;
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to retrieve buyers',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get buyer by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Buyer ID' })
    @ApiResponse({ status: 200, description: 'Buyer found' })
    @ApiResponse({ status: 404, description: 'Buyer not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.buyersService.findOne(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Buyer found',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Buyer not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error retrieving buyer',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a buyer' })
    @ApiParam({ name: 'id', type: 'number', description: 'Buyer ID' })
    @ApiBody({ type: UpdateBuyerDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBuyerDto: UpdateBuyerDto,
        @Res() res: Response,
    ) {
        try {
            const data = await this.buyersService.update(id, updateBuyerDto);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Buyer updated successfully',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Buyer not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error updating buyer',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a buyer' })
    @ApiParam({ name: 'id', type: 'number', description: 'Buyer ID' })
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.buyersService.remove(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Buyer deleted successfully',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Buyer not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error deleting buyer',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }
}
