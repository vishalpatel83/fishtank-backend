// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Fisherman } from 'src/fishermen/entities/fisherman.entity';
import { Buyer } from 'src/buyers/entities/buyer.entity';
import { DeliveryPartner } from 'src/delivery-partners/entities/delivery-partner.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Fisherman,  // Make sure this is included
            Buyer,
            DeliveryPartner
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }