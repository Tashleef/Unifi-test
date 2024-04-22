import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MagicItemRepository } from '../data/magic-item.repository';
import { MagicItemError } from './magic-item-error.service';
import { Op } from 'sequelize';
import { Item } from 'src/magic-mover/api/dto/request';
import { MagicItem } from '../data/magic-item.schema';

@Injectable()
export class MagicItemService {
  constructor(
    private magicItemRepository: MagicItemRepository,
    private magicItemError: MagicItemError,
  ) {}

  async validateItems(items: Item[]) {
    const ids = items.map((item) => item.id);
    const dbItems = await this.magicItemRepository.findAll({
      where: { id: { [Op.in]: ids } },
    });
    return dbItems;
  }

  async transformItems(items: Item[], dbItems: MagicItem[]) {
    const map = new Map<number, number>();
    items.map((item) => {
      map.set(item.id, item.quantity);
    });

    const transformedItems = dbItems.map((item) => {
      if (!map.has(item.id)) {
        throw new HttpException('', HttpStatus.CONFLICT);
      }
      const quantity = map.get(item.id);
      return {
        id: item.id,
        quantity,
        weight: item.weight,
      };
    });

    return transformedItems;
  }
}
