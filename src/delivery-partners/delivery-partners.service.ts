import { Injectable } from '@nestjs/common';
import { CreateDeliveryPartnerDto } from './dto/create-delivery-partner.dto';
import { UpdateDeliveryPartnerDto } from './dto/update-delivery-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryPartner } from './entities/delivery-partner.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class DeliveryPartnersService {
    constructor(
        @InjectRepository(DeliveryPartner)
        private deliveryPartnerRepository: Repository<DeliveryPartner>,
        private usersService: UsersService,
    ) { }

    async create(createDeliveryPartnerDto: CreateDeliveryPartnerDto) {
        const { name, email, phone, password, address, ...partnerSpecific } = createDeliveryPartnerDto;

        // 1. Create a user first with common fields
        const user = await this.usersService.create({
            name,
            email,
            phone,
            password,
            address,
            role: UserRole.DELIVERY_PERSON,
        });

        // 2. Create the delivery partner with only role-specific fields + user_id
        const partner = this.deliveryPartnerRepository.create({
            ...partnerSpecific,
            user_id: user.id,
        });
        return await this.deliveryPartnerRepository.save(partner);
    }

    async findAll() {
        return await this.deliveryPartnerRepository.find({ relations: ['user'] });
    }

    async findOne(id: number) {
        return await this.deliveryPartnerRepository.findOne({ where: { id }, relations: ['user'] });
    }

    async update(id: number, updateDeliveryPartnerDto: UpdateDeliveryPartnerDto) {
        return this.deliveryPartnerRepository.update(id, updateDeliveryPartnerDto);
    }

    async remove(id: number) {
        return this.deliveryPartnerRepository.delete(id);
    }
}
