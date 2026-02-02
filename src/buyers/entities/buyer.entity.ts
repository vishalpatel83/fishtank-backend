import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';

export enum BuyerStatus {
    ACTIVE = 'Active',
    SUSPENDED = 'Suspended',
    DELETED = 'Deleted',
}

@Entity('buyers')
export class Buyer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 150, unique: true, nullable: true })
    email: string;

    @Column({ length: 15 })
    phone: string;

    @Column({ length: 255 })
    password_hash: string;

    @Column({ length: 150, nullable: true })
    company_name: string;

    @Column('text', { nullable: true })
    address: string;

    @Column({ length: 20, nullable: true })
    gst_number: string;

    @CreateDateColumn()
    registered_at: Date;

    @Column({
        type: 'enum',
        enum: BuyerStatus,
        default: BuyerStatus.ACTIVE,
    })
    status: BuyerStatus;

    @Column({ name: 'user_id', nullable: true })
    user_id: number;

    @OneToOne(() => User, (user) => user.buyer)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Order, (order) => order.buyer)
    orders: Order[];
}
