import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MagicItemApiService } from 'src/magic-item/service/magic-item-api.service';
import { MagicItemValidation } from '../validation';
import { CreateMagicItem } from '../dto/request';

@Controller('magic-items')
export class MagicItemApiController {
  constructor(
    private readonly magicItemService: MagicItemApiService,
    private readonly magicItemValidation: MagicItemValidation,
  ) {}

  @Post('')
  async create(@Body() body: CreateMagicItem) {
    this.magicItemValidation.create({ body });
    const magicItem = await this.magicItemService.create(body);
    return { id: magicItem.id };
  }
}
