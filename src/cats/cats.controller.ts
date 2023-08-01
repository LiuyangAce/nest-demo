import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { request } from 'express';
import { HttpCode, Header, Query, Redirect, Param } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
@Controller({host: 'admin.example.com'})
export class CatsController {
  @Post()
  // @HttpCode(204)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto): Promise<string> {
    console.log(createCatDto);
    return `This action adds a new cat `;
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('docs')
  @Redirect('https://nestjs.com')
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get('ab*cd')
  wildcard() {
    return 'This route uses a wildcard';
  }

  // @Get(':id')
  // findOne(@Param() params): string {
  //   return `This action returns ${params.id} cats`;
  // }
  @Get(':id')
  findOne(@Param('id') id): string {
    return `This action returns ${id} cats`;
  }

  // @Get('promiseFindAll')
  // async findAll2(): Promise<any[]> {
  //   return [];
  // }
}
