import { Injectable } from '@nestjs/common';

import { MagicItemRepository } from '../data/magic-item.repository';

import { MagicItemError } from './magic-item-error.service';
import { CreateMagicItem } from '../api/dto/request';

@Injectable()
export class MagicItemApiService {
  constructor(
    private magicItemRepository: MagicItemRepository,
    private magicItemError: MagicItemError,
  ) {}

  async create(body: CreateMagicItem) {
    const magicItem = await this.magicItemRepository.create({
      doc: body,
    });
    return magicItem;
  }
}
