import {
  HttpStatus,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpException,
  UseFilters,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { Response, Request, query } from 'express';
import { HttpCode, Header, Query, Redirect, Param } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

// 导入自定义异常
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { AllExceptionsFilter } from 'src/exception/all-exceptions.filter';
import { JoiValidationPipe, ValidationPipe } from 'src/pipe/validation.pipe';
import Joi from 'joi';

// 对象结构验证
// const createCatSchema = Joi.object({
//   name: Joi.string().required(),
//   age: Joi.number().integer().min(1).max(30).required(),
//   breed: Joi.string().required(),
// });
@Controller('cats')
@Controller({ host: 'admin.example.com' })
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Header('Cache-Control', 'none')
  /**
   *  @UseFilters()装饰器 参数的两种形式
   *  实例或者类（推荐）
   */
  // @UseFilters(new HttpExceptionFilter)
  // @UseFilters(HttpExceptionFilter)
  @UseFilters(AllExceptionsFilter)
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto): Promise<string> {
    console.log('传入的参数：', createCatDto);
    await this.catsService.create(createCatDto);
    if (Math.random() > 0.5) {
      return `This action adds a new cat `;
    } else {
      throw new ForbiddenException();
    }
  }

  // {passthrough: true} 用了@Res然后加这个 就可以继续使用
  // nestjs 的 特性 比如这里的 return 当成response
  @Get()
  async findAll(@Res({ passthrough: true }) res: Response): Promise<void> {
    // const result = this.catsService.findAll()
    // res.status(HttpStatus.CREATED).send({result})

    /**
     * 抛出异常的方法
     */
    // throw new HttpException('Forbiddenxxx', HttpStatus.FORBIDDEN);
    // throw new HttpException({
    //   stateCode: HttpStatus.FORBIDDEN,
    //   message: 'this is message'
    // }, HttpStatus.FORBIDDEN);

    throw new ForbiddenException();
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
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
    @Query('name', ParseIntPipe) query,
    @Res({ passthrough: true }) res: Response,
  ): object {
    console.log(id, query);

    /**
     * 这里用res.send和直接return都可以
     */
    // res.send({
    //   id, query
    // })
    return {
      id: id,
      ...query,
    };
  }

  // 自定义状态码
  @Get('stateCode')
  @HttpCode(204)
  stateCode() {
    return 'userState';
  }
}
