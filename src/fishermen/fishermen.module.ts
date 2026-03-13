import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FishermenService } from './fishermen.service';
import { FishermenController } from './fishermen.controller';
import { Fisherman } from './entities/fisherman.entity';
import { UsersModule } from '../users/users.module';

/**
 * Fishermen Module
 *
 * This module handles all fishermen-related operations including:
 * - Creating new fisherman records
 * - Retrieving fisherman information
 * - Updating fisherman details
 * - Deleting fisherman records
 *
 * Provides integration with the database through TypeORM
 */
@Module({
  imports: [TypeOrmModule.forFeature([Fisherman]), forwardRef(() => UsersModule)],
  controllers: [FishermenController],
  providers: [FishermenService],
})
export class FishermenModule { }
