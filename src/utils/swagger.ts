import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerInit(app) {
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('这是接口文档')
    .setVersion('1.0')
    // .addTag('liuy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
