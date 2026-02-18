import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Fisherman } from '../../fishermen/entities/fisherman.entity';

export enum FishLotStatus {
    AVAILABLE = 'available',
    SOLD = 'sold',
    CANCELLED = 'cancelled',
}

@Entity('fish_lots')
export class FishLot {
    @PrimaryGeneratedColumn()
    lot_id: number;

    @Column()
    fisherman_id: number;

    @ManyToOne(() => Fisherman, (fisherman) => fisherman.fishLots)
    @JoinColumn({ name: 'fisherman_id' })
    fisherman: Fisherman;

    @Column({ length: 50 })
    fish_type: string;

    @Column('decimal', { precision: 10, scale: 2 })
    weight_kg: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price_per_kg: number;

    @Column({
        type: 'enum',
        enum: FishLotStatus,
        default: FishLotStatus.AVAILABLE,
    })
    status: FishLotStatus;

    @Column({ type: 'date', nullable: true })
    catch_date: Date;

    @Column({ length: 255, nullable: true })
    catch_location: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ length: 50, nullable: true })
    quality_grade: string;

    @CreateDateColumn()
    added_at: Date;
}
