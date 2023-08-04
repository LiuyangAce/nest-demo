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
  Put,
  Delete,
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateCatDto } from './dto/update-cat.dto';

// 对象结构验证
// const createCatSchema = Joi.object({
//   name: Joi.string().required(),
//   age: Joi.number().integer().min(1).max(30).required(),
//   breed: Joi.string().required(),
// });
@Controller('cats')
// @ApiBearerAuth()
@ApiTags('catTags')
@Controller({ host: 'admin.example.com' })
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: '创建cat' })
  @Header('Cache-Control', 'none')
  /**
   *  @UseFilters()装饰器 参数的两种形式
   *  实例或者类（推荐）
   */
  // @UseFilters(new HttpExceptionFilter)
  // @UseFilters(HttpExceptionFilter)
  // @UseFilters(AllExceptionsFilter)
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatBody: CreateCatDto): Promise<string> {
    console.log('传入的参数：', createCatBody);
    await this.catsService.create(createCatBody);
    // if (Math.random() > 0.5) {
    return `This action adds a new cat `;
    // } else {
    // throw new ForbiddenException();
    // }
  }

  // {passthrough: true} 用了@Res然后加这个 就可以继续使用
  // nestjs 的 特性 比如这里的 return 当成response
  @Get()
  @ApiOperation({ summary: '查询所有' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    const result = await this.catsService.findAll();
    return result;
    // res.status(HttpStatus.CREATED).send({result})
    /**
     * 抛出异常的方法
     */
    // throw new HttpException('Forbiddenxxx', HttpStatus.FORBIDDEN);
    // throw new HttpException({
    //   stateCode: HttpStatus.FORBIDDEN,
    //   message: 'this is message'
    // }, HttpStatus.FORBIDDEN);
    // throw new ForbiddenException();
  }

  @Post('/findAttr')
  @ApiOperation({ summary: '查询特定属性' })
  findAttr(@Req() req: Request) {
    const result = this.catsService.findAttr();
    console.log(result);
    return [];
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
  @Get(':id')
  async findOne(
    @Param(
      'id',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
    @Query('name', ParseIntPipe) query,
    @Res({ passthrough: true }) res: Response,
  ): Promise<object> {
    console.log('in findOne:', id, query);
    const result = await this.catsService.findOne(id);
    // console.log(result);
    console.log(result[0].dataValues);
    return result;
    /**
     * 这里用res.send和直接return都可以
     */
    // res.send({
    //   id, query
    // })
    // return {
    //   id: id,
    //   ...query,
    // };
  }

  // 自定义状态码
  @Get('stateCode')
  @HttpCode(204)
  stateCode() {
    return 'userState';
  }

  @Put(':id')
  @ApiOperation({ summary: '根据id更新数据' })
  async update(@Param('id') id: string, @Body() body: UpdateCatDto) {
    console.log('in Put:', id, body);
    const result = await this.catsService.updateOne(id, body);
    console.log(result);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: '根据id删除数据' })
  async drop(
    @Param() paramId,
    @Query() id: string,
    @Body() body: UpdateCatDto,
  ) {
    console.log(paramId, id, body);
    return await this.catsService.dropOne(paramId.id);
  }
}
