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

export enum FishermanRole {
  ADMIN = 'admin',
  FISHERMAN = 'fisherman',
  BUYER = 'buyer',
  DELIVERYMAN = 'deliveryman',
}

@Entity('fishermen')
export class Fisherman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column('text')
  address: string;

  @Column({ length: 100 })
  location: string;

  @Column({ length: 20 })
  aadhaar_number: string;

  @Column({ length: 30 })
  bank_account_no: string;

  @Column({ length: 20 })
  ifsc_code: string;

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

  @Column({
    type: 'enum',
    enum: FishermanRole,
    default: FishermanRole.FISHERMAN,
  })
  role: FishermanRole;

  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @OneToOne(() => User, (user) => user.fisherman)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => FishLot, (fishLot) => fishLot.fisherman)
  fishLots: FishLot[];
}
