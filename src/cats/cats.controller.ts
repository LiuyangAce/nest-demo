import { HttpStatus, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { request } from 'express';
import { HttpCode, Header, Query, Redirect, Param } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
@Controller({host: 'admin.example.com'})
export class CatsController {
  constructor(private catsService: CatsService) {}


  @Post()
  // @HttpCode(204)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto): Promise<string> {
    console.log(createCatDto);
    await this.catsService.create(createCatDto)
    return `This action adds a new cat `;
  }

  @Get()
  async findAll(@Res() res:Response): Promise<any> {
    // const result = this.catsService.findAll()
    // return '1'
    // return result
    // res.status(HttpStatus.CREATED).send({
    //   result
    // })
    return `This action returns all cats ${res}!`;
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

  // 方法一
  // @Get(':id')
  // findOne(@Param() params): string {
  //   return `This action returns ${params.id} cats`;
  // }
  // 方法二
  @Get(':id')
  findOne(@Param('id') id): string {
    return `This action returns ${id} cats`;
  }

  // @Get('promiseFindAll')
  // async findAll2(): Promise<any[]> {
  //   return [];
  // }
}
