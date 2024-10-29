import { Module } from '@nestjs/common';
import { BlackListedPhnumberService } from './black-listed-phnumber.service';
import { BlackListedPhnumberController } from './black-listed-phnumber.controller';

@Module({
  controllers: [BlackListedPhnumberController],
  providers: [BlackListedPhnumberService],
})
export class BlackListedPhnumberModule {}
