import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
  constructor() {
    console.log(456);
    super('这里是自定义异常Forbidden', HttpStatus.FORBIDDEN);
  }
}