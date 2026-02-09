import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DeliveryVehicle } from './delivery-vehicle.entity';

export enum AvailabilityStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    BUSY = 'BUSY',
}

@Entity('delivery_partners')
export class DeliveryPartner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @OneToOne(() => User, (user) => user.deliveryPartner)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: 'enum',
        enum: AvailabilityStatus,
        default: AvailabilityStatus.OFFLINE,
    })
    availability_status: AvailabilityStatus;

    @Column({ type: 'float', default: 0 })
    rating: number;

    @Column({ type: 'int', default: 0 })
    total_deliveries: number;

    @OneToMany(() => DeliveryVehicle, (vehicle) => vehicle.deliveryPartner)
    vehicles: DeliveryVehicle[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
