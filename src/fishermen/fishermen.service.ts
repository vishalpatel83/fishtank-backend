import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFishermanDto } from './dto/create-fisherman.dto';
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
    const {
      name, email, phone, password,
      address, location, aadhaar_number, bank_account_no, ifsc_code,
      ...fishermanSpecific
    } = createFishermanDto;

    // 1. Create a user first with common fields
    const user = await this.usersService.create({
      name,
      email,
      phone,
      password,
      address,
      location,
      aadhaar_number,
      bank_account_no,
      ifsc_code,
      role: UserRole.FISHERMAN,
    });

    // 2. Create the fisherman with only role-specific fields + user_id
    const fisherman = this.fishermenRepository.create({
      ...fishermanSpecific,
      user_id: user.id,
    });
    return await this.fishermenRepository.save(fisherman);
  }

  async findAll() {
    return await this.fishermenRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    return await this.fishermenRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async remove(id: number) {
    const fisherman = await this.findOne(id);
    if (!fisherman) return null;
    await this.fishermenRepository.delete(id);
    return fisherman;
  }
}
