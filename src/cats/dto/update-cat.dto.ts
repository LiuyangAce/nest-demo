/*
  update-cat.dto.ts
*/
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateCatDto {
  @ApiProperty({ description: '名字' })
  // @ApiPropertyOptional({ description: '名字' })
  readonly name: string;

  @ApiProperty({ description: '年龄' })
  readonly age: number;

  readonly breed: string;
}
