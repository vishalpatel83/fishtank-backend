import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const { password, ...userData } = createUserDto;
        const user = this.usersRepository.create({
            ...userData,
            password_hash: password, // Note: In a real app, hash the password here
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
