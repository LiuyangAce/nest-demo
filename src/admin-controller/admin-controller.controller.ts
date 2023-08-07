import { Controller, Get } from '@nestjs/common';

// @Controller('admin-controller')
@Controller({ host: 'localhost', path: 'admin' })
export class AdminControllerController {
  @Get()
  index(): string {
    return 'admin page';
  }
}
