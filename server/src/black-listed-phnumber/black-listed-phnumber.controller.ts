import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlackListedPhnumberService } from './black-listed-phnumber.service';
import { CreateBlackListedPhnumberDto } from './dto/create-black-listed-phnumber.dto';
import { UpdateBlackListedPhnumberDto } from './dto/update-black-listed-phnumber.dto';
import { diskStorage } from 'multer';


@Controller('black-listed-phnumber')
export class BlackListedPhnumberController {
  constructor(private readonly blackListedPhnumberService: BlackListedPhnumberService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        callback(null, `uploaded_${Date.now()}_${file.originalname}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (file.mimetype !== 'text/csv') {
        return callback(new HttpException('Only .csv files are allowed!', HttpStatus.BAD_REQUEST), false);
      }
      callback(null, true);
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    try {
      await this.blackListedPhnumberService.importPhoneNumbersFromUploadedFile(file.path);
      return 'File uploaded and phone numbers imported successfully';
    } catch (error) {
      throw new HttpException(
        'Failed to import phone numbers. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Get('import')
  async importPhoneNumbers(): Promise<string> {
    try {
      const csvUrl = 'http://res-staging.workstream.us/phone.csv';
      await this.blackListedPhnumberService.importPhoneNumbersFromCsv(csvUrl);
      return 'Phone numbers imported successfully';
    } catch (error) {
      console.error("Error importing phone numbers:", error);
      throw new HttpException(
        'Failed to import phone numbers. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  findAll() {
    return this.blackListedPhnumberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new HttpException(
        'Invalid ID provided, it must be a number',
        HttpStatus.BAD_REQUEST
      );
    }
    const result = await this.blackListedPhnumberService.findOne(parsedId);
    if (!result) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlackListedPhnumberDto: UpdateBlackListedPhnumberDto) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new HttpException(
        'Invalid ID provided, it must be a number',
        HttpStatus.BAD_REQUEST
      );
    }
    return this.blackListedPhnumberService.update(parsedId, updateBlackListedPhnumberDto);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new HttpException(
        'Invalid ID provided, it must be a number',
        HttpStatus.BAD_REQUEST
      );
    }
    return this.blackListedPhnumberService.remove(parsedId);
  }
}