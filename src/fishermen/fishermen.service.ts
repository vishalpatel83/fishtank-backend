import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFishermanDto } from './dto/create-fisherman.dto';
// import { UpdateFishermanDto } from './dto/update-fisherman.dto';
import { Fisherman } from './entities/fisherman.entity';

@Injectable()
export class FishermenService {
  constructor(
    @InjectRepository(Fisherman)
    private fishermenRepository: Repository<Fisherman>,
  ) {}

  create(createFishermanDto: CreateFishermanDto) {
    const fisherman = this.fishermenRepository.create(createFishermanDto);
    return this.fishermenRepository.save(fisherman);
  }

  findAll() {
    return `This action returns all fishermen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fisherman`;
  }

  // update(id: number, updateFishermanDto: UpdateFishermanDto) {
  //   return `This action updates a #${id} fisherman`;
  // }

  remove(id: number) {
    return `This action removes a #${id} fisherman`;
  }
}
