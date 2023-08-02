import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
  constructor() {
    super('这里是自定义异常Forbidden', HttpStatus.FORBIDDEN);
  }
}