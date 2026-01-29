import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
    constructor(
        @InjectRepository(Delivery)
        private deliveriesRepository: Repository<Delivery>,
    ) { }

    async create(createDeliveryDto: CreateDeliveryDto) {
        const delivery = this.deliveriesRepository.create(createDeliveryDto);
        return await this.deliveriesRepository.save(delivery);
    }

    async findAll() {
        return await this.deliveriesRepository.find({
            relations: ['order'],
        });
    }

    async findOne(id: number) {
        return await this.deliveriesRepository.findOne({
            where: { delivery_id: id },
            relations: ['order'],
        });
    }

    async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
        await this.deliveriesRepository.update(id, updateDeliveryDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const delivery = await this.findOne(id);
        if (!delivery) return null;
        await this.deliveriesRepository.delete(id);
        return delivery;
    }
}
