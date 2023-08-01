import { Controller,Get } from '@nestjs/common';

// @Controller('admin-controller')
@Controller({ host: 'admin.example.com' })
export class AdminControllerController {
  @Get()
  index():string{
    return 'admin page'
  }
}
