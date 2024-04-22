import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {
  MagicMoverLogRepository,
  MagicMoverRepository,
} from '../data/magic-mover.repository';

import { MagicMoverError } from './magic-mover-error.service';
import {
  CreateMagicMover,
  LoadItems,
  UpdateMagicMover,
} from '../api/dto/request';
import { MagicItemService } from 'src/magic-item/service/magic-item.service';
import { Params } from 'additions/component/params/params';
import { MagicMover, nextStep, state } from '../data/magic-mover.schema';
import { MagicItemError } from 'src/magic-item/service/magic-item-error.service';
import { MissionService } from 'src/mission/service/mission.service';
import { Mission } from 'src/mission/data/mission.schema';
import { calculateWeightAndQuantity } from '../helper/calculate-weight';
import { Transaction } from 'sequelize';
import { Pagination } from 'additions/pagination/dto';

@Injectable()
export class MagicMoverApiService {
  constructor(
    private magicMoverRepository: MagicMoverRepository,
    private magicMoverLogRepository: MagicMoverLogRepository,
    private magicItemService: MagicItemService,
    private missionService: MissionService,
    private magicMoverError: MagicMoverError,
    private magicItemError: MagicItemError,
  ) {}

  async findOneById(id: number) {
    const mover = await this.magicMoverRepository.findOne({
      where: { id },
      error: this.magicMoverError.notFound(),
      include: [Mission],
    });
    return mover;
  }

  async findAllLogs({ limit, offset }: Pagination) {
    const logs = await this.magicMoverLogRepository.findAndCount({
      options: { offset, limit },
      include: [MagicMover],
    });
    return logs;
  }
  async findAll({ limit, offset }: Pagination) {
    const movers = await this.magicMoverRepository.findAndCount({
      options: { offset, limit },
    });
    return movers;
  }

  async create(body: CreateMagicMover) {
    const magicMover = await this.magicMoverRepository.create({
      doc: body,
    });
    return magicMover;
  }

  async update(
    body: UpdateMagicMover,
    { id }: Params,
    transaction: Transaction,
  ) {
    const mover = await this.magicMoverRepository.findOne({
      where: { id },
      error: this.magicMoverError.notFound(),
      include: [Mission],
    });

    if (!nextStep[mover.state].includes(body.state)) {
      throw new HttpException(
        this.magicMoverError.notValidState(),
        HttpStatus.BAD_REQUEST,
      );
    }

    body.completedMissions =
      body.state === state.resting && mover.state === state.onMission
        ? mover.completedMissions + 1
        : mover.completedMissions;
    let currentMissionId =
      body.state === state.onMission ? mover.currentMissionId : null;
    if (body.state === state.loading) {
      const mission = await this.missionService.create(
        { moverId: mover.id, limit: mover.limit, energy: mover.energy },
        transaction,
      );
      currentMissionId = mission.id;
    } else if (
      //? haven't load anything yet
      body.state === state.onMission &&
      mover.mission.limit === mover.limit
    ) {
      throw new HttpException(
        this.magicMoverError.cannotGoToMission(),
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.magicMoverRepository.update({
      where: { id },
      update: {
        ...body,
        currentMissionId,
      },
      transaction,
    });

    await this.magicMoverLogRepository.create({
      doc: {
        moverId: id,
        state:
          body.state === state.resting ? state.completedMission : body.state,
      },
    });
  }

  async loadItems(body: LoadItems, { id }: Params, transaction: Transaction) {
    const mover = await this.findOneById(id);

    if (mover.state !== state.loading) {
      throw new HttpException(
        this.magicMoverError.notLoadingState(),
        HttpStatus.BAD_REQUEST,
      );
    }
    const items = await this.magicItemService.validateItems(body.items);

    if (items.length !== body.items.length) {
      throw new HttpException(
        this.magicItemError.notFound(),
        HttpStatus.NOT_FOUND,
      );
    }

    const transformedItems = await this.magicItemService.transformItems(
      body.items,
      items,
    );

    const { totalWeight, totalQuantity } =
      calculateWeightAndQuantity(transformedItems);

    console.log(mover);

    if (mover.mission.energy < totalWeight) {
      throw new HttpException(
        this.magicItemError.notEnoughEnergy(),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (mover.mission.limit < totalQuantity) {
      throw new HttpException(
        this.magicItemError.itemOverLimit(),
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.missionService.update(
      mover.currentMissionId,
      totalWeight,
      totalQuantity,
      transaction,
    );

    await this.missionService.addItemsToMission(
      mover.currentMissionId,
      transformedItems,
      transaction,
    );
    return;
  }
}
