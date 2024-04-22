import { Module } from '@nestjs/common';
import { MagicItemApiService } from './service/magic-item-api.service';
import { MagicItemError } from './service/magic-item-error.service';
import { MagicItemValidation } from './api/validation';
import { MagicItemRepository } from './data/magic-item.repository';
import { MagicItemApiController } from './api/controller/magic-item-api.controller';
import { MagicItemService } from './service/magic-item.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MagicItem } from './data/magic-item.schema';

@Module({
  imports: [SequelizeModule.forFeature([MagicItem])],
  controllers: [MagicItemApiController],
  providers: [
    MagicItemRepository,
    MagicItemApiService,
    MagicItemError,
    MagicItemValidation,
    MagicItemService,
  ],
  exports: [MagicItemService, MagicItemError],
})
export class MagicItemModule {}
