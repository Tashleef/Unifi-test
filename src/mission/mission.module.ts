import { Module } from '@nestjs/common';
import { MissionApiService } from './service/mission-api.service';
import { MissionError } from './service/mission-error.service';
import { MissionValidation } from './api/validation';
import {
  MagicItemMissionRepository,
  MissionRepository,
} from './data/mission.repository';
import { MissionApiController } from './api/controller/mission-api.controller';
import { MissionService } from './service/mission.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MagicItemMission, Mission } from './data/mission.schema';

@Module({
  imports: [SequelizeModule.forFeature([Mission, MagicItemMission])],
  controllers: [MissionApiController],
  providers: [
    MissionRepository,
    MagicItemMissionRepository,
    MissionApiService,
    MissionError,
    MissionValidation,
    MissionService,
  ],
  exports: [MissionService],
})
export class MissionModule {}
