import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum FishermanStatus {
  ACTIVE = 'Active',
  SUSPENDED = 'Suspended',
  PENDING = 'Pending',
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
}
