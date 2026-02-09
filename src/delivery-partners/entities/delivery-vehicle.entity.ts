import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { DeliveryPartner } from './delivery-partner.entity';

export enum VehicleType {
    BIKE = 'BIKE',
    AUTO = 'AUTO',
    VAN = 'VAN',
    TRUCK = 'TRUCK',
}

@Entity('delivery_vehicles')
export class DeliveryVehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    delivery_partner_id: number;

    @ManyToOne(() => DeliveryPartner, (partner) => partner.vehicles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'delivery_partner_id' })
    deliveryPartner: DeliveryPartner;

    @Column({
        type: 'enum',
        enum: VehicleType,
    })
    vehicle_type: VehicleType;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    capacity_kg: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    km_charge: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    base_charge: number;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
