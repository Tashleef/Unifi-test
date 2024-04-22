import { Injectable } from '@nestjs/common';
import { MagicItemMission, Mission } from './mission.schema';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from 'additions/component/database/sequelize/sequelize.repository';

@Injectable()
export class MissionRepository extends SequelizeRepository<Mission> {
  constructor(
    @InjectModel(Mission)
    missionRepository: typeof Mission,
  ) {
    super(missionRepository);
  }
}

@Injectable()
export class MagicItemMissionRepository extends SequelizeRepository<MagicItemMission> {
  constructor(
    @InjectModel(MagicItemMission)
    magicItemMissionRepository: typeof MagicItemMission,
  ) {
    super(magicItemMissionRepository);
  }
}
