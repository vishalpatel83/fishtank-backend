import { Injectable } from '@nestjs/common';
import { CreateDeliveryPartnerDto } from './dto/create-delivery-partner.dto';
import { UpdateDeliveryPartnerDto } from './dto/update-delivery-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryPartner } from './entities/delivery-partner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryPartnersService {
    constructor(
        @InjectRepository(DeliveryPartner)
        private deliveryPartnerRepository: Repository<DeliveryPartner>,
    ) { }

    create(createDeliveryPartnerDto: CreateDeliveryPartnerDto) {
        const deliveryPartner = this.deliveryPartnerRepository.create(createDeliveryPartnerDto);
        return this.deliveryPartnerRepository.save(deliveryPartner);
    }

    findAll() {
        return this.deliveryPartnerRepository.find();
    }

    findOne(id: number) {
        return this.deliveryPartnerRepository.findOne({ where: { id } });
    }

    update(id: number, updateDeliveryPartnerDto: UpdateDeliveryPartnerDto) {
        return this.deliveryPartnerRepository.update(id, updateDeliveryPartnerDto);
    }

    remove(id: number) {
        return this.deliveryPartnerRepository.delete(id);
    }
}
