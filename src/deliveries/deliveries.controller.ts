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
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import type { Response } from 'express';
import { ResultModal } from '../common/result';

@ApiTags('deliveries')
@Controller('deliveries')
export class DeliveriesController {
    constructor(private readonly deliveriesService: DeliveriesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new delivery' })
    @ApiBody({ type: CreateDeliveryDto })
    @ApiResponse({ status: 201, description: 'Delivery created successfully' })
    async create(@Body() createDeliveryDto: CreateDeliveryDto, @Res() res: Response) {
        try {
            const data = await this.deliveriesService.create(createDeliveryDto);
            const result = new ResultModal(
                data,
                'Delivery created successfully',
                HttpStatus.CREATED,
                true,
                '',
            ).result;
            return res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to create delivery',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all deliveries' })
    @ApiResponse({ status: 200, description: 'List of all deliveries retrieved' })
    async findAll(@Res() res: Response) {
        try {
            const data = await this.deliveriesService.findAll();
            const result = new ResultModal(
                data,
                'Deliveries retrieved successfully',
                HttpStatus.OK,
                true,
                '',
            ).result;
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to retrieve deliveries',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get delivery by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Delivery ID' })
    @ApiResponse({ status: 200, description: 'Delivery found' })
    @ApiResponse({ status: 404, description: 'Delivery not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.deliveriesService.findOne(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Delivery found',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Delivery not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error retrieving delivery',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a delivery' })
    @ApiParam({ name: 'id', type: 'number', description: 'Delivery ID' })
    @ApiBody({ type: UpdateDeliveryDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDeliveryDto: UpdateDeliveryDto,
        @Res() res: Response,
    ) {
        try {
            const data = await this.deliveriesService.update(id, updateDeliveryDto);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Delivery updated successfully',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Delivery not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error updating delivery',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a delivery' })
    @ApiParam({ name: 'id', type: 'number', description: 'Delivery ID' })
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.deliveriesService.remove(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Delivery deleted successfully',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Delivery not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error deleting delivery',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }
}
