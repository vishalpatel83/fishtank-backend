import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from './entities/user.entity';
import { Fisherman } from '../fishermen/entities/fisherman.entity';
import { Buyer } from '../buyers/entities/buyer.entity';
import { DeliveryPartner } from '../delivery-partners/entities/delivery-partner.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @InjectRepository(Fisherman)  // Make sure this is present
        private fishermanRepository: Repository<Fisherman>,

        @InjectRepository(Buyer)
        private buyerRepository: Repository<Buyer>,

        @InjectRepository(DeliveryPartner)
        private deliveryPartnerRepository: Repository<DeliveryPartner>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const { password, confirmPassword, phone, role, ...userData } = createUserDto;

        // Map phone to mobile_number if not provided
        if (!userData.mobile_number && phone) {
            userData.mobile_number = phone;
        }

        // Map role number strings to enum values
        // "1" → FISHERMAN, "2" → INDUSTRY_BUYER, "3" → DELIVERY_PERSON
        let userRole: UserRole;
        if (role === '1' || role === UserRole.FISHERMAN) {
            userRole = UserRole.FISHERMAN;
        } else if (role === '2' || role === UserRole.INDUSTRY_BUYER) {
            userRole = UserRole.INDUSTRY_BUYER;
        } else if (role === '3' || role === UserRole.DELIVERY_PERSON) {
            userRole = UserRole.DELIVERY_PERSON;
        } else if (role === UserRole.ADMIN) {
            userRole = UserRole.ADMIN;
        } else {
            userRole = UserRole.FISHERMAN;
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        // 1. Create and save the user record
        const user = this.usersRepository.create({
            ...userData,
            role: userRole,
            password_hash: hash,
        });
        const savedUser = await this.usersRepository.save(user);

        // 2. Create the role-specific profile record
        let roleProfile: Fisherman | Buyer | DeliveryPartner | null = null;

        if (userRole === UserRole.FISHERMAN) {
            const fisherman = this.fishermanRepository.create({ user_id: savedUser.id });
            roleProfile = await this.fishermanRepository.save(fisherman);
        } else if (userRole === UserRole.INDUSTRY_BUYER) {
            const buyer = this.buyerRepository.create({ user_id: savedUser.id });
            roleProfile = await this.buyerRepository.save(buyer);
        } else if (userRole === UserRole.DELIVERY_PERSON) {
            const partner = this.deliveryPartnerRepository.create({ user_id: savedUser.id });
            roleProfile = await this.deliveryPartnerRepository.save(partner);
        }

        return { user: savedUser, roleProfile };
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

    async findByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: [
                { email: username },
                { mobile_number: username }
            ]
        });
    }
}

