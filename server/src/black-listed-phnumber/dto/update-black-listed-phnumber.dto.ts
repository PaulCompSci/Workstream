import { PartialType } from '@nestjs/mapped-types';
import { CreateBlackListedPhnumberDto } from './create-black-listed-phnumber.dto';

export class UpdateBlackListedPhnumberDto extends PartialType(CreateBlackListedPhnumberDto) {}
