import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

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

    @OneToMany(() => Order, (order) => order.buyer)
    orders: Order[];
}
