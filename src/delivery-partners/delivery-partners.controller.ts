import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryPartnersService } from './delivery-partners.service';
import { CreateDeliveryPartnerDto } from './dto/create-delivery-partner.dto';
import { UpdateDeliveryPartnerDto } from './dto/update-delivery-partner.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('delivery partners')
@Controller('delivery-partners')
export class DeliveryPartnersController {
    constructor(private readonly deliveryPartnersService: DeliveryPartnersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new delivery partner' })
    @ApiBody({ type: CreateDeliveryPartnerDto })
    @ApiResponse({ status: 201, description: 'Delivery partner created successfully' })
    create(@Body() createDeliveryPartnerDto: CreateDeliveryPartnerDto) {
        return this.deliveryPartnersService.create(createDeliveryPartnerDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all delivery partners' })
    @ApiResponse({ status: 200, description: 'List of all delivery partners retrieved' })
    findAll() {
        return this.deliveryPartnersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get delivery partner by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Delivery partner ID' })
    @ApiResponse({ status: 200, description: 'Delivery partner found' })
    @ApiResponse({ status: 404, description: 'Delivery partner not found' })
    findOne(@Param('id') id: string) {
        return this.deliveryPartnersService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a delivery partner' })
    @ApiParam({ name: 'id', type: 'number', description: 'Delivery partner ID' })
    @ApiBody({ type: UpdateDeliveryPartnerDto })
    @ApiResponse({ status: 200, description: 'Delivery partner updated successfully' })
    update(@Param('id') id: string, @Body() updateDeliveryPartnerDto: UpdateDeliveryPartnerDto) {
        return this.deliveryPartnersService.update(+id, updateDeliveryPartnerDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a delivery partner' })
    @ApiParam({ name: 'id', type: 'number', description: 'Delivery partner ID' })
    @ApiResponse({ status: 200, description: 'Delivery partner deleted successfully' })
    remove(@Param('id') id: string) {
        return this.deliveryPartnersService.remove(+id);
    }
}
