import { Injectable } from '@nestjs/common';

import { MissionRepository } from '../data/mission.repository';

import { MissionError } from './mission-error.service';
import { CreateMission } from '../api/dto/request';

@Injectable()
export class MissionApiService {
  constructor(
    private missionRepository: MissionRepository,
    private missionError: MissionError,
  ) {}
}
