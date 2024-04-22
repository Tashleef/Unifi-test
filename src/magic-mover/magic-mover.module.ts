import { Module } from '@nestjs/common';
import { MagicMoverApiService } from './service/magic-mover-api.service';
import { MagicMoverError } from './service/magic-mover-error.service';
import { MagicMoverValidation } from './api/validation';
import {
  MagicMoverLogRepository,
  MagicMoverRepository,
} from './data/magic-mover.repository';
import { MagicMoverApiController } from './api/controller/magic-mover-api.controller';
import { MagicMoverService } from './service/magic-mover.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MagicMover, MagicMoverLog } from './data/magic-mover.schema';
import { MagicItemModule } from 'src/magic-item/magic-item.module';
import { MissionModule } from 'src/mission/mission.module';

@Module({
  imports: [
    SequelizeModule.forFeature([MagicMover, MagicMoverLog]),
    MagicItemModule,
    MissionModule,
  ],
  controllers: [MagicMoverApiController],
  providers: [
    MagicMoverRepository,
    MagicMoverLogRepository,
    MagicMoverApiService,
    MagicMoverError,
    MagicMoverValidation,
    MagicMoverService,
  ],
  exports: [MagicMoverService],
})
export class MagicMoverModule {}
