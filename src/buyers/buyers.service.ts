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
        const { name, email, phone, password, address, ...buyerSpecific } = createBuyerDto;

        // 1. Create a user first with common fields
        const user = await this.usersService.create({
            name,
            email,
            phone,
            password,
            address,
            role: UserRole.INDUSTRY_BUYER,
        });

        // 2. Create the buyer with only role-specific fields + user_id
        const buyer = this.buyersRepository.create({
            ...buyerSpecific,
            user_id: user.id,
        });
        return await this.buyersRepository.save(buyer);
    }

    async findAll() {
        return await this.buyersRepository.find({ relations: ['user'] });
    }

    async findOne(id: number) {
        return await this.buyersRepository.findOne({ where: { id }, relations: ['user'] });
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
