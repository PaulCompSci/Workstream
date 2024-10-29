import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlackListedPhnumberService } from './black-listed-phnumber.service';
import { CreateBlackListedPhnumberDto } from './dto/create-black-listed-phnumber.dto';
import { UpdateBlackListedPhnumberDto } from './dto/update-black-listed-phnumber.dto';

@Controller('black-listed-phnumber')
export class BlackListedPhnumberController {
  constructor(private readonly blackListedPhnumberService: BlackListedPhnumberService) {}

  @Post()
  create(@Body() createBlackListedPhnumberDto: CreateBlackListedPhnumberDto) {
    return this.blackListedPhnumberService.create(createBlackListedPhnumberDto);
  }

  @Get()
  findAll() {
    return this.blackListedPhnumberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blackListedPhnumberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlackListedPhnumberDto: UpdateBlackListedPhnumberDto) {
    return this.blackListedPhnumberService.update(+id, updateBlackListedPhnumberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blackListedPhnumberService.remove(+id);
  }
}
