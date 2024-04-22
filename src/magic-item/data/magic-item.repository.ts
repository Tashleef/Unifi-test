import { Injectable } from '@nestjs/common';
import { MagicItem } from './magic-item.schema';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from 'additions/component/database/sequelize/sequelize.repository';

@Injectable()
export class MagicItemRepository extends SequelizeRepository<MagicItem> {
  constructor(
    @InjectModel(MagicItem)
    magicItemRepository: typeof MagicItem,
  ) {
    super(magicItemRepository);
  }
}
