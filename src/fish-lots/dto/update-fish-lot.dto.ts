import { PartialType } from '@nestjs/swagger';
import { CreateFishLotDto } from './create-fish-lot.dto';

export class UpdateFishLotDto extends PartialType(CreateFishLotDto) { }
