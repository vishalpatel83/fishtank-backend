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

    @Column({ name: 'user_id' })
    user_id: number;

    @OneToOne(() => User, (user) => user.buyer)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ length: 150, nullable: true })
    company_name: string;

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
