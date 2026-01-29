import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from './entities/buyer.entity';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';

@Injectable()
export class BuyersService {
    constructor(
        @InjectRepository(Buyer)
        private buyersRepository: Repository<Buyer>,
    ) { }

    async create(createBuyerDto: CreateBuyerDto) {
        const { password, ...buyerData } = createBuyerDto;
        const buyer = this.buyersRepository.create({
            ...buyerData,
            password_hash: password, // In production, hash this password
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
