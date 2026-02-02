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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { ResultModal } from '../common/result';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const data = await this.usersService.create(createUserDto);
            const result = new ResultModal(
                data,
                'User created successfully',
                HttpStatus.CREATED,
                true,
                '',
            ).result;
            return res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to create user',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of all users retrieved' })
    async findAll(@Res() res: Response) {
        try {
            const data = await this.usersService.findAll();
            const result = new ResultModal(
                data,
                'Users retrieved successfully',
                HttpStatus.OK,
                true,
                '',
            ).result;
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            const result = new ResultModal(
                {},
                'Failed to retrieve users',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.usersService.findOne(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'User found',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'User not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error retrieving user',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    @ApiBody({ type: UpdateUserDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Res() res: Response,
    ) {
        try {
            const data = await this.usersService.update(id, updateUserDto);
            if (data) {
                const result = new ResultModal(
                    data,
                    'User updated successfully',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'User not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error updating user',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            const data = await this.usersService.remove(id);
            if (data) {
                const result = new ResultModal(
                    data,
                    'User deleted successfully',
                    HttpStatus.OK,
                    true,
                    '',
                ).result;
                return res.status(HttpStatus.OK).json(result);
            } else {
                const result = new ResultModal(
                    {},
                    'User not found',
                    HttpStatus.NOT_FOUND,
                    false,
                    '',
                ).result;
                return res.status(HttpStatus.NOT_FOUND).json(result);
            }
        } catch (error) {
            const result = new ResultModal(
                {},
                'Error deleting user',
                HttpStatus.BAD_REQUEST,
                false,
                error.message,
            ).result;
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }
    }
}
