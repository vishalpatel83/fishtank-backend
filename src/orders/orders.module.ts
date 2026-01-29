import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { FishLotsModule } from '../fish-lots/fish-lots.module';
import { BuyersModule } from '../buyers/buyers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        FishLotsModule,
        BuyersModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule { }
