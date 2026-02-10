import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm';
import { Buyer } from '../../buyers/entities/buyer.entity';
import { Fisherman } from '../../fishermen/entities/fisherman.entity';
import { DeliveryPartner } from '../../delivery-partners/entities/delivery-partner.entity';

export enum UserRole {
    FISHERMAN = 'FISHERMAN',
    INDUSTRY_BUYER = 'INDUSTRY_BUYER',
    DELIVERY_PERSON = 'DELIVERY_PERSON',
    ADMIN = 'ADMIN',
}

export enum UserStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 15, unique: true })
    mobile_number: string;

    @Column({ length: 150, unique: true })
    email: string;

    @Column({ length: 255 })
    password_hash: string;

    @Column({ length: 20, nullable: true })
    aadhaar_number: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @Column({ length: 50, nullable: true })
    bank_account_no: string;

    @Column({ length: 20, nullable: true })
    ifsc_code: string;

    @Column({ length: 100, nullable: true })
    location: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.FISHERMAN,
    })
    role: UserRole;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.PENDING,
    })
    status: UserStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Buyer, (buyer) => buyer.user)
    buyer: Buyer;

    @OneToOne(() => Fisherman, (fisherman) => fisherman.user)
    fisherman: Fisherman;

    @OneToOne(() => DeliveryPartner, (deliveryPartner) => deliveryPartner.user)
    deliveryPartner: DeliveryPartner;
}
