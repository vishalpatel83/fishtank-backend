import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from './entities/buyer.entity';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class BuyersService {
    constructor(
        @InjectRepository(Buyer)
        private buyersRepository: Repository<Buyer>,
        private usersService: UsersService,
    ) { }

    async create(createBuyerDto: CreateBuyerDto) {
        const { password, ...buyerData } = createBuyerDto;

        // 1. Create a user first
        const user = await this.usersService.create({
            name: createBuyerDto.name,
            email: createBuyerDto.email,
            mobile_number: createBuyerDto.phone,
            password: password,
            role: UserRole.INDUSTRY_BUYER,
        });

        // 2. Create the buyer with the user_id
        const buyer = this.buyersRepository.create({
            ...buyerData,
            password_hash: password, // Still keeping this for now as per current schema
            user_id: user.id,
        });
        return await this.buyersRepository.save(buyer);
    }

    async findAll() {
        return await this.buyersRepository.find();
    }

    async findOne(id: number) {
        return await this.buyersRepository.findOne({ where: { id } });
    }

    async update(id: number, updateBuyerDto: UpdateBuyerDto) {
        await this.buyersRepository.update(id, updateBuyerDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const buyer = await this.findOne(id);
        if (!buyer) return null;
        await this.buyersRepository.delete(id);
        return buyer;
    }
}
