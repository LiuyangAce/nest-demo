import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminControllerController } from './admin-controller/admin-controller.controller';
import { ReCatsController } from './re-cats/re-cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { CatsController } from "./cats/cats.controller";
import { logger } from "./middleware/logger.middleware";

@Module({
  imports: [CatsModule],
  controllers: [AppController,  AdminControllerController, ReCatsController],
  providers: [AppService, ],
})
export class AppModule implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     // 可以穿入多个中间件 a,b,c
  //     .apply(LoggerMiddleware)
  //     // 限定中间件应用的路由
  //     // .forRoutes('cats');
  //     // .forRoutes({ path: 'cats', method: RequestMethod.GET});

  //     // 排除
  //     .exclude(
  //       { path: 'cats', method: RequestMethod.GET },
  //       { path: 'cats', method: RequestMethod.POST },
  //       'cats/(.*)',
  //     )

  //     // 可以传入一个/多个控制器
  //     .forRoutes(CatsController);
  // }

  /**
   * 函数式组件 和 多个中间件结合使用
   * @param consumer 
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes(CatsController)
  }
}
