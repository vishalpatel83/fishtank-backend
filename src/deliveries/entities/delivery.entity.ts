import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum DeliveryStatus {
    SCHEDULED = 'Scheduled',
    PICKED = 'Picked',
    DELIVERED = 'Delivered',
}

@Entity('deliveries')
export class Delivery {
    @PrimaryGeneratedColumn()
    delivery_id: number;

    @Column()
    order_id: number;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ type: 'datetime', nullable: true })
    pickup_time: Date;

    @Column({ length: 100 })
    delivery_agent: string;

    @Column({
        type: 'enum',
        enum: DeliveryStatus,
        default: DeliveryStatus.SCHEDULED,
    })
    status: DeliveryStatus;
}
