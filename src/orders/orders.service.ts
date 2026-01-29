import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ) { }

    async create(createOrderDto: CreateOrderDto) {
        const order = this.ordersRepository.create(createOrderDto);
        return await this.ordersRepository.save(order);
    }

    async findAll() {
        return await this.ordersRepository.find({
            relations: ['fishLot', 'buyer'],
        });
    }

    async findOne(id: number) {
        return await this.ordersRepository.findOne({
            where: { order_id: id },
            relations: ['fishLot', 'buyer'],
        });
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        await this.ordersRepository.update(id, updateOrderDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const order = await this.findOne(id);
        if (!order) return null;
        await this.ordersRepository.delete(id);
        return order;
    }
}
