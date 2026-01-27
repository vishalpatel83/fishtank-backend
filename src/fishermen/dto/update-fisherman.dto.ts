import { PartialType } from '@nestjs/mapped-types';
import { CreateFishermanDto } from './create-fisherman.dto';

export class UpdateFishermanDto extends PartialType(CreateFishermanDto) {}
