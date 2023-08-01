import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AdminControllerController } from './admin-controller/admin-controller.controller';
import { ReCatsController } from './re-cats/re-cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AdminControllerController, ReCatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
