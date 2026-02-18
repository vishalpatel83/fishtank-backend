import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFishLotDto } from './dto/create-fish-lot.dto';
import { UpdateFishLotDto } from './dto/update-fish-lot.dto';
import { FishLot } from './entities/fish-lot.entity';

@Injectable()
export class FishLotsService {
    constructor(
        @InjectRepository(FishLot)
        private fishLotsRepository: Repository<FishLot>,
    ) { }

    async create(createFishLotDto: CreateFishLotDto) {
        const { catchDate, catchLocation, qualityGrade, ...rest } = createFishLotDto;
        const fishLot = this.fishLotsRepository.create({
            ...rest,
            catch_date: catchDate ? new Date(catchDate) : undefined,
            catch_location: catchLocation,
            quality_grade: qualityGrade,
        });
        return await this.fishLotsRepository.save(fishLot);
    }

    async findAll() {
        return await this.fishLotsRepository.find({
            relations: ['fisherman'],
        });
    }

    async findOne(id: number) {
        return await this.fishLotsRepository.findOne({
            where: { lot_id: id },
            relations: ['fisherman'],
        });
    }

    async update(id: number, updateFishLotDto: UpdateFishLotDto) {
        await this.fishLotsRepository.update(id, updateFishLotDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const fishLot = await this.findOne(id);
        if (!fishLot) return null;
        await this.fishLotsRepository.delete(id);
        return fishLot;
    }
}
