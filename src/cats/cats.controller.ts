import { HttpStatus, Body, Controller, Get, Post, Req, Res, HttpException } from '@nestjs/common';
import { Response, Request, query } from 'express';
import { HttpCode, Header, Query, Redirect, Param } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
@Controller({host: 'admin.example.com'})
export class CatsController {
  constructor(private catsService: CatsService) {}


  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto): Promise<string> {
    console.log(createCatDto);
    await this.catsService.create(createCatDto)
    return `This action adds a new cat `;
  }

  // {passthrough: true} 用了@Res然后加这个 就可以继续使用
  // nestjs 的 特性 比如这里的 return 当成response
  @Get()
  async findAll(@Res({passthrough: true}) res:Response): Promise<void> {
    // const result = this.catsService.findAll()
    // res.status(HttpStatus.CREATED).send({result})


    // throw new HttpException('Forbiddenxxx', HttpStatus.FORBIDDEN);
    throw new HttpException({
      stateCode: HttpStatus.FORBIDDEN,
      message: 'this is message'
    }, HttpStatus.FORBIDDEN);
  }

  // 重定向
  @Get('docs')
  @Redirect('https://nestjs.com')
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // 匹配路由
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
  @Get('findOnebyId/:id')
  findOne(@Param('id') id, @Query() query, @Res({passthrough:true}) res:Response): object {
    console.log(id, query);

    /**
     * 这里用res.send和直接return都可以
     */
    // res.send({
    //   id, query
    // })
    return {
      id: id,
      ...query
    }
  }


  // 自定义状态码
  @Get('stateCode')
  @HttpCode(204)
  stateCode() {
    return "userState"
  }
}
