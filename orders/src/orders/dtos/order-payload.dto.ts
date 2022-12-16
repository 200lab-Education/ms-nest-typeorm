import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Min } from 'class-validator';
export class OrderPayload {
  @IsString()
  @ApiProperty({ example: 'Donal Trump' })
  readonly name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'donaltrump.inwhitehouse@gmail.com' })
  readonly email: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 1 })
  readonly quantity: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 2.34 })
  readonly price: number;
}
