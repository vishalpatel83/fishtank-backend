import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FishLotsService } from './fish-lots.service';
import { FishLotsController } from './fish-lots.controller';
import { FishLot } from './entities/fish-lot.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FishLot])],
    controllers: [FishLotsController],
    providers: [FishLotsService],
    exports: [FishLotsService],
})
export class FishLotsModule { }
