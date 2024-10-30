import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { BlackListedPhnumber } from './entities/black-listed-phnumber.entity';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import axios from 'axios';
import { Readable } from 'stream';
import { UpdateBlackListedPhnumberDto } from './dto/update-black-listed-phnumber.dto';
import { CreateBlackListedPhnumberDto } from './dto/create-black-listed-phnumber.dto';
import * as readline from 'readline';
import * as fs from 'fs';

@Injectable()
export class BlackListedPhnumberService {
  private readonly logger = new Logger(BlackListedPhnumberService.name);

  constructor(
    @InjectRepository(BlackListedPhnumber)
    private readonly phoneRepo: Repository<BlackListedPhnumber>,
  ) {}

  // Method to process a single phone number
  private async processPhoneNumber(rawPhoneNumber: string): Promise<void> {
    try {
      if (!rawPhoneNumber) {
        this.logger.warn('Empty phone number received');
        return;
      }

      // Clean and format phone number
      const cleanedNumber = String(rawPhoneNumber).replace(/[^\d]/g, '').trim();
      const phoneNumberWithCountry = cleanedNumber.startsWith('1') 
        ? `+${cleanedNumber}`
        : `+1${cleanedNumber}`;

      // Log the formatted number for debugging
      this.logger.debug(`Formatted phone number: ${phoneNumberWithCountry}`);

      // Attempt to save directly to the database without validation
      try {
        const newPhoneNumber = this.phoneRepo.create({ phoneNumber: phoneNumberWithCountry });
        await this.phoneRepo.save(newPhoneNumber);
        this.logger.debug(`Imported phone number: ${phoneNumberWithCountry}`);
      } catch (error) {
        if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
          this.logger.debug(`Phone number already exists: ${phoneNumberWithCountry}`);
        } else {
          this.logger.error(`Error saving phone number ${phoneNumberWithCountry}: ${error.message}`);
        }
      }
    } catch (error) {
      this.logger.error(`Error processing phone number ${rawPhoneNumber}: ${error.message}`);
    }
  }
  

  // Method to import phone numbers from CSV
  async importPhoneNumbersFromCsv(url: string): Promise<void> {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const csvData = Buffer.from(response.data).toString();
      
      return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
          input: Readable.from(csvData),
          crlfDelay: Infinity
        });

        let processedCount = 0;
        let errorCount = 0;
        let duplicateCount = 0;

        rl.on('line', async (line) => {
          try {
            await this.processPhoneNumber(line.trim());
            processedCount++;
          } catch (error) {
            if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
              duplicateCount++;
            } else {
              errorCount++;
              this.logger.error(`Error processing line: ${line}, Error: ${error.message}`);
            }
          }
        });

        rl.on('close', () => {
          this.logger.log(`CSV processing completed. Summary:
            - Total processed: ${processedCount}
            - Duplicates found: ${duplicateCount}
            - Errors encountered: ${errorCount}`);
          resolve();
        });

        rl.on('error', (error) => {
          this.logger.error(`Error processing CSV: ${error.message}`);
          reject(new HttpException(
            'Failed to process CSV file',
            HttpStatus.INTERNAL_SERVER_ERROR
          ));
        });
      });
    } catch (error) {
      this.logger.error(`Failed to fetch or process CSV: ${error.message}`);
      throw new HttpException(
        'Failed to import phone numbers',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Enhanced CRUD methods with better error handling
  async create(createBlackListedPhnumberDto: CreateBlackListedPhnumberDto) {
    try {
      const newEntry = this.phoneRepo.create(createBlackListedPhnumberDto);
      return await this.phoneRepo.save(newEntry);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
        throw new HttpException(
          'Phone number already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Failed to create phone number entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await this.phoneRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new HttpException(
        'Invalid ID provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    const record = await this.phoneRepo.findOne({ where: { id } });
    if (!record) {
      throw new HttpException(
        'Record not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return record;
  }

  async update(id: number, updateBlackListedPhnumberDto: UpdateBlackListedPhnumberDto) {
    try {
      const record = await this.phoneRepo.findOne({ where: { id } });
      if (!record) {
        throw new HttpException(
          'Record not found',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.phoneRepo.update(id, updateBlackListedPhnumberDto);
      return await this.phoneRepo.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
        throw new HttpException(
          'Phone number already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }

  async importPhoneNumbersFromUploadedFile(filePath: string): Promise<void> {
    try {
      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      let processedCount = 0;
      let errorCount = 0;
      let duplicateCount = 0;

      rl.on('line', async (line) => {
        try {
          await this.processPhoneNumber(line.trim());
          processedCount++;
        } catch (error) {
          if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
            duplicateCount++;
          } else {
            errorCount++;
            this.logger.error(`Error processing line: ${line}, Error: ${error.message}`);
          }
        }
      });

      await new Promise<void>((resolve, reject) => {
        rl.on('close', resolve);
        rl.on('error', reject);
      });

      this.logger.log(`CSV processing completed. Summary:
        - Total processed: ${processedCount}
        - Duplicates found: ${duplicateCount}
        - Errors encountered: ${errorCount}
      `);

    } catch (error) {
      this.logger.error(`Failed to process uploaded CSV file: ${error.message}`);
      throw new HttpException(
        'Failed to import phone numbers from uploaded file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      fs.unlink(filePath, (err) => {
        if (err) this.logger.warn(`Failed to delete uploaded file: ${filePath}`);
      });
    }
  }

  async remove(id: number) {
    const record = await this.phoneRepo.findOne({ where: { id } });
    if (!record) {
      throw new HttpException(
        'Record not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.phoneRepo.delete(id);
    return {
      message: `Phone number with id ${id} deleted successfully`,
      deletedNumber: record.phoneNumber,
    };
  }
}
