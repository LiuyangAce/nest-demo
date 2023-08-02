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


// import { Module, DynamicModule } from '@nestjs/common';
// import { createDatabaseProviders } from './database.providers';
// import { Connection } from './connection.provider';

// @Module({
//   providers: [Connection],
// })
// export class DatabaseModule {
//   static forRoot(entities = [], options?): DynamicModule {
//     const providers = createDatabaseProviders(options, entities);
//     return {
//       module: DatabaseModule,
//       providers: providers,
//       exports: providers,
//     };
//   }
// }