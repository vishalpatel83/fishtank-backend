import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FishLot } from '../../fish-lots/entities/fish-lot.entity';
import { User } from '../../users/entities/user.entity';

export enum FishermanStatus {
  ACTIVE = 'Active',
  SUSPENDED = 'Suspended',
  PENDING = 'Pending',
}

@Entity('fishermen')
export class Fisherman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @OneToOne(() => User, (user) => user.fisherman)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 255, nullable: true })
  profile_photo: string;

  @CreateDateColumn()
  registered_at: Date;

  @Column({ default: false })
  is_verified: boolean;

  @Column({
    type: 'enum',
    enum: FishermanStatus,
    default: FishermanStatus.PENDING,
  })
  status: FishermanStatus;

  @OneToMany(() => FishLot, (fishLot) => fishLot.fisherman)
  fishLots: FishLot[];
}
