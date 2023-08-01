import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService} from './cats.service';

// 将这个模块变成全局模块 在任何地方都能使用
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
