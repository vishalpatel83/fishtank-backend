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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import type { Response } from 'express';
import { ResultModal } from '../common/result';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiBody({ type: CreateOrderDto })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    async create(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
        try {
            const data = await this.ordersService.create(createOrderDto);
            const result = new ResultModal(
                data,
                'Order created successfully',
                HttpStatus.CREATED,
                true,
                '',
            ).result;
            return res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to create order',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ status: 200, description: 'List of all orders retrieved' })
    async findAll(@Res() res: Response) {
        try {
            const data = await this.ordersService.findAll();
            const result = new ResultModal(
                data,
                'Orders retrieved successfully',
                HttpStatus.OK,
                true,
                '',
            ).result;
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to retrieve orders',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get order by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
    @ApiResponse({ status: 200, description: 'Order found' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.ordersService.findOne(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Order found',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Order not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error retrieving order',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an order' })
    @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
    @ApiBody({ type: UpdateOrderDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOrderDto: UpdateOrderDto,
        @Res() res: Response,
    ) {
        try {
            const data = await this.ordersService.update(id, updateOrderDto);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Order updated successfully',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Order not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error updating order',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an order' })
    @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.ordersService.remove(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Order deleted successfully',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Order not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error deleting order',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }
}
