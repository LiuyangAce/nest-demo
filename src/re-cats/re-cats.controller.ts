import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response} from 'express';
@Controller('re-cats')
export class ReCatsController {
  @Post()
  create(@Res() res:Response) {
    res.status(HttpStatus.CREATED).send({
      data: 'something'
    })
  }

  @Get()
  findAll(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return [1,2,3,4,5,'s'];
  }
}
