import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyersService } from './buyers.service';
import { BuyersController } from './buyers.controller';
import { Buyer } from './entities/buyer.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Buyer]), forwardRef(() => UsersModule)],
    controllers: [BuyersController],
    providers: [BuyersService],
    exports: [BuyersService],
})
export class BuyersModule { }
