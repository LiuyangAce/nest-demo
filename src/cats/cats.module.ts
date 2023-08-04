import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './model/cat.model';

export const HTTP_OPTIONS = 'ltt';

// 将这个模块变成全局模块 在任何地方都能使用
@Global()
@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: 'HTTP_OPTIONS_self',
      useValue: HTTP_OPTIONS,
    },
  ],
  exports: [CatsService],
})
export class CatsModule {}
