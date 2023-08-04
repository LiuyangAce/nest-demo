import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cat } from './model/cat.model';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat)
    private readonly catModel: typeof Cat,
  ) {}
  // private readonly cats = [];

  create(cat) {
    // this.cats.push(cat);
    return this.catModel.create(cat);
  }

  findAll() {
    const result = this.catModel.findAll();
    console.log(result);
    // return this.cats;
    return result;
  }

  findOne(id) {
    return this.catModel.findAll({
      where: {
        id: id,
      },
    });
    // console.log(id);
  }

  updateOne(id, body) {
    return this.catModel.update(body, {
      where: {
        id: id,
      },
    });
  }

  dropOne(id) {
    return this.catModel.destroy({
      where: {
        id: id,
      },
    });
  }

  findAttr() {
    console.log('in findAttr');
  }
}
