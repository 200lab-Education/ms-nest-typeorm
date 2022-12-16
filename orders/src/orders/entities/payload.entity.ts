import { IsEmail, IsNumber, IsString, Min } from 'class-validator';
import { Column } from 'typeorm';

export class Payload {
  @Column({ nullable: false })
  @IsString()
  name: string;

  @Column({ nullable: false })
  @IsString()
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsNumber()
  @Min(0)
  quantity: number;

  @Column({ nullable: false })
  @IsNumber()
  @Min(0)
  price: number;
}
