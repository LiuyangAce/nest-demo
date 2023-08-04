import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  /**
   * 全局注入sequelize
   * @param sequelize
   */
  constructor(private sequelize: Sequelize) {}
  getHello(): string {
    return 'Hello World!';
  }
}
