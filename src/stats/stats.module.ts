import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Order } from '../orders/entities/order.entity';
import { FishLot } from '../fish-lots/entities/fish-lot.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, FishLot])],
    controllers: [StatsController],
    providers: [StatsService],
})
export class StatsModule {}
