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
import { MissionApiService } from 'src/mission/service/mission-api.service';
import { MissionValidation } from '../validation';
import { CreateMission } from '../dto/request';

@Controller('missions')
export class MissionApiController {
  constructor(
    private readonly missionService: MissionApiService,
    private readonly missionValidation: MissionValidation,
  ) {}
}
