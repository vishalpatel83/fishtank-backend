import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const { password, confirmPassword, phone, role, ...userData } = createUserDto;

        // Map phone to mobile_number if not provided
        if (!userData.mobile_number && phone) {
            userData.mobile_number = phone;
        }

        // Map role "1" to FISHERMAN, or use provided role
        // Map role "2" to INDUSTRY_BUYER
        let userRole: UserRole;
        if (role === '1') {
            userRole = UserRole.FISHERMAN;
        } else if (role === '2') {
            userRole = UserRole.INDUSTRY_BUYER;
        } else if (role === '3') {
            userRole = UserRole.DELIVERY_PERSON;
        } else {
            userRole = UserRole.FISHERMAN;
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        const user = this.usersRepository.create({
            ...userData,
            role: userRole,
            password_hash: hash,
        });
        return await this.usersRepository.save(user);
    }

    async findAll() {
        return await this.usersRepository.find();
    }

    async findOne(id: number) {
        return await this.usersRepository.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const { password, ...userData } = updateUserDto;
        const updateData: any = { ...userData };

        if (password) {
            updateData.password_hash = password;
        }

        await this.usersRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) return null;
        await this.usersRepository.delete(id);
        return user;
    }
}
