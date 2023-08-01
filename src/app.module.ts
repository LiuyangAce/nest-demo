import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AdminControllerController } from './admin-controller/admin-controller.controller';
import { ReCatsController } from './re-cats/re-cats.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AdminControllerController, ReCatsController],
  providers: [AppService],
})
export class AppModule {}
