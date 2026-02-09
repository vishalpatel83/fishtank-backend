import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPartner } from './entities/delivery-partner.entity';
import { DeliveryVehicle } from './entities/delivery-vehicle.entity';
import { DeliveryPartnersController } from './delivery-partners.controller';
import { DeliveryPartnersService } from './delivery-partners.service';

@Module({
    imports: [TypeOrmModule.forFeature([DeliveryPartner, DeliveryVehicle])],
    controllers: [DeliveryPartnersController],
    providers: [DeliveryPartnersService],
    exports: [TypeOrmModule],
})
export class DeliveryPartnersModule { }
