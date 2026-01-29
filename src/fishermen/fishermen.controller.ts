import { FishermenService } from './fishermen.service';
import { CreateFishermanDto } from './dto/create-fisherman.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import type { Response } from 'express';
import { ResultModal } from '../common/result';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('fishermen')
// @ApiBearerAuth('access-token')
// @UseGuards(JwtAuthGuard)
@Controller('fishermen')
export class FishermenController {
  constructor(private readonly fishermenService: FishermenService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new fisherman' })
  @ApiBody({ type: CreateFishermanDto })
  @ApiResponse({
    status: 201,
    description: 'Fisherman created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async create(@Body() createFishermanDto: CreateFishermanDto, @Res() res: Response) {
    try {
      const data = await this.fishermenService.create(createFishermanDto);
      const result = new ResultModal(data, 'Fisherman created successfully', HttpStatus.CREATED, true, '').result;
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      const result = new ResultModal({}, 'Failed to create fisherman', HttpStatus.BAD_REQUEST, false, error.message).result;
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all fishermen' })
  @ApiResponse({
    status: 200,
    description: 'List of all fishermen retrieved',
  })
  async findAll(@Res() res: Response) {
    try {
      const data = await this.fishermenService.findAll();
      const result = new ResultModal(data, 'Fishermen retrieved successfully', HttpStatus.OK, true, '').result;
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      const result = new ResultModal({}, 'Failed to retrieve fishermen', HttpStatus.BAD_REQUEST, false, error.message).result;
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get fisherman by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Fisherman ID' })
  @ApiResponse({
    status: 200,
    description: 'Fisherman found',
  })
  @ApiResponse({
    status: 404,
    description: 'Fisherman not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const data = await this.fishermenService.findOne(id);
      if (data) {
        const result = new ResultModal(data, 'Fisherman found', HttpStatus.OK, true, '').result;
        return res.status(HttpStatus.OK).json(result);
      } else {
        const result = new ResultModal({}, 'Fisherman not found', HttpStatus.NOT_FOUND, false, '').result;
        return res.status(HttpStatus.NOT_FOUND).json(result);
      }
    } catch (error) {
      const result = new ResultModal({}, 'Error retrieving fisherman', HttpStatus.BAD_REQUEST, false, error.message).result;
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFishermanDto: UpdateFishermanDto,
  // ) {
  //   return this.fishermenService.update(+id, updateFishermanDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a fisherman' })
  @ApiParam({ name: 'id', type: 'number', description: 'Fisherman ID' })
  @ApiResponse({
    status: 200,
    description: 'Fisherman deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Fisherman not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const data = await this.fishermenService.remove(id);
      if (data) {
        const result = new ResultModal(data, 'Fisherman deleted successfully', HttpStatus.OK, true, '').result;
        return res.status(HttpStatus.OK).json(result);
      } else {
        const result = new ResultModal({}, 'Fisherman not found', HttpStatus.NOT_FOUND, false, '').result;
        return res.status(HttpStatus.NOT_FOUND).json(result);
      }
    } catch (error) {
      const result = new ResultModal({}, 'Error deleting fisherman', HttpStatus.BAD_REQUEST, false, error.message).result;
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }
}
