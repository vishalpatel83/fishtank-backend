import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FishermenService } from './fishermen.service';
import { FishermenController } from './fishermen.controller';
import { Fisherman } from './entities/fisherman.entity';

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
  imports: [TypeOrmModule.forFeature([Fisherman])],
  controllers: [FishermenController],
  providers: [FishermenService],
})
export class FishermenModule {}
