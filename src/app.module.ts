import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminControllerController } from './admin-controller/admin-controller.controller';
import { ReCatsController } from './re-cats/re-cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController,  AdminControllerController, ReCatsController],
  providers: [AppService, ],
})
export class AppModule {}
