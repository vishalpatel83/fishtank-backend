import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { FishLot } from '../../fish-lots/entities/fish-lot.entity';
import { Buyer } from '../../buyers/entities/buyer.entity';

export enum OrderStatus {
    PENDING = 'Pending',
    PICKED = 'Picked',
    DELIVERED = 'Delivered',
    CANCELLED = 'Cancelled',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column()
    lot_id: number;

    @ManyToOne(() => FishLot)
    @JoinColumn({ name: 'lot_id' })
    fishLot: FishLot;

    @Column()
    buyer_id: number;

    @ManyToOne(() => Buyer, (buyer) => buyer.orders)
    @JoinColumn({ name: 'buyer_id' })
    buyer: Buyer;

    @Column('decimal', { precision: 10, scale: 2 })
    quantity_kg: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total_price: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @CreateDateColumn()
    order_date: Date;
}
