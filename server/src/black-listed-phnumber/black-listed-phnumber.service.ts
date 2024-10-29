import { Injectable } from '@nestjs/common';
import { CreateBlackListedPhnumberDto } from './dto/create-black-listed-phnumber.dto';
import { UpdateBlackListedPhnumberDto } from './dto/update-black-listed-phnumber.dto';

@Injectable()
export class BlackListedPhnumberService {
  create(createBlackListedPhnumberDto: CreateBlackListedPhnumberDto) {
    return 'This action adds a new blackListedPhnumber';
  }

  findAll() {
    return `This action returns all blackListedPhnumber`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blackListedPhnumber`;
  }

  update(id: number, updateBlackListedPhnumberDto: UpdateBlackListedPhnumberDto) {
    return `This action updates a #${id} blackListedPhnumber`;
  }

  remove(id: number) {
    return `This action removes a #${id} blackListedPhnumber`;
  }
}
