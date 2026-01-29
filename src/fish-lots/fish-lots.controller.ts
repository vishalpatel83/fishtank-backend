import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    Res,
    ParseIntPipe,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { FishLotsService } from './fish-lots.service';
import { CreateFishLotDto } from './dto/create-fish-lot.dto';
import { UpdateFishLotDto } from './dto/update-fish-lot.dto';
import { ResultModal } from '../common/result';

@ApiTags('fish-lots')
@Controller('fish-lots')
export class FishLotsController {
    constructor(private readonly fishLotsService: FishLotsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new fish lot' })
    @ApiBody({ type: CreateFishLotDto })
    @ApiResponse({ status: 201, description: 'Fish lot created successfully' })
    async create(
        @Body() createFishLotDto: CreateFishLotDto,
        @Res() res: Response,
    ) {
        try {
            const data = await this.fishLotsService.create(createFishLotDto);
            const result = new ResultModal(
                data,
                'Fish lot created successfully',
                HttpStatus.CREATED,
                true,
                '',
            ).result;
            return res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to create fish lot',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all fish lots' })
    @ApiResponse({ status: 200, description: 'List of all fish lots retrieved' })
    async findAll(@Res() res: Response) {
        try {
            const data = await this.fishLotsService.findAll();
            const result = new ResultModal(
                data,
                'Fish lots retrieved successfully',
                HttpStatus.OK,
                true,
                '',
            ).result;
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to retrieve fish lots',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get fish lot by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Fish lot ID' })
    @ApiResponse({ status: 200, description: 'Fish lot found' })
    @ApiResponse({ status: 404, description: 'Fish lot not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.fishLotsService.findOne(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Fish lot found',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Fish lot not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error retrieving fish lot',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a fish lot' })
    @ApiParam({ name: 'id', type: 'number', description: 'Fish lot ID' })
    @ApiBody({ type: UpdateFishLotDto })
    @ApiResponse({ status: 200, description: 'Fish lot updated successfully' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFishLotDto: UpdateFishLotDto,
        @Res() res: Response,
    ) {
        try {
            const data = await this.fishLotsService.update(id, updateFishLotDto);
            const result = new ResultModal(
                data,
                'Fish lot updated successfully',
                HttpStatus.OK,
                true,
                '',
            ).result;
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error updating fish lot',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a fish lot' })
    @ApiParam({ name: 'id', type: 'number', description: 'Fish lot ID' })
    @ApiResponse({ status: 200, description: 'Fish lot deleted successfully' })
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.fishLotsService.remove(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'Fish lot deleted successfully',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'Fish lot not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error deleting fish lot',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }
}
