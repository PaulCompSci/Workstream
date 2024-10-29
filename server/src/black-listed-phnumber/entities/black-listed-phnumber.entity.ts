import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'blacklisted_phone_numbers'}) // Defines the table name
export class BlackListedPhnumber {
  @PrimaryGeneratedColumn() // Auto-generated unique ID for each record
  id: number;

  @Column({ unique: true }) // Unique column for storing phone numbers
  phoneNumber: string;
}
