import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFishermanDto } from './dto/create-fisherman.dto';
// import { UpdateFishermanDto } from './dto/update-fisherman.dto';
import { Fisherman } from './entities/fisherman.entity';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class FishermenService {
  constructor(
    @InjectRepository(Fisherman)
    private fishermenRepository: Repository<Fisherman>,
    private usersService: UsersService,
  ) { }

  async create(createFishermanDto: CreateFishermanDto) {
    // 1. Create a user first
    const user = await this.usersService.create({
      name: createFishermanDto.name,
      email: createFishermanDto.email,
      mobile_number: createFishermanDto.phone,
      password: createFishermanDto.password_hash, // Assuming password_hash is passed from client for now
      role: UserRole.FISHERMAN,
    });

    // 2. Create the fisherman with the user_id
    const fisherman = this.fishermenRepository.create({
      ...createFishermanDto,
      user_id: user.id,
    });
    return await this.fishermenRepository.save(fisherman);
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
