/*
  create-cat.dto.ts
*/
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';
export class CreateCatDto {
  @IsString()
  @IsNotEmpty({ message: '请填写name字段！！' })
  @ApiProperty({ description: '名字' })
  readonly name: string;

  @IsInt()
  @ApiProperty({ description: '年龄' })
  readonly age: number;

  @IsString()
  @ApiProperty({ description: '种类' })
  readonly breed: string;
}
