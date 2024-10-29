import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlackListedPhnumber } from './entities/black-listed-phnumber.entity';
import { BlackListedPhnumberService } from './black-listed-phnumber.service';
import { BlackListedPhnumberController } from './black-listed-phnumber.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([BlackListedPhnumber]), // Register the entity here
  ],
  controllers: [BlackListedPhnumberController],
  providers: [BlackListedPhnumberService],
})
export class BlackListedPhnumberModule {}
