import { Injectable } from '@nestjs/common';
import {
  MagicItemMissionRepository,
  MissionRepository,
} from '../data/mission.repository';
import { MissionError } from './mission-error.service';
import { Transaction } from 'sequelize';

@Injectable()
export class MissionService {
  constructor(
    private missionRepository: MissionRepository,
    private magicItemMissionRepository: MagicItemMissionRepository,
    private missionError: MissionError,
  ) {}

  async create(
    mover: { moverId: number; energy: number; limit: number },
    transaction: Transaction,
  ) {
    return await this.missionRepository.create({
      doc: mover,
      options: { transaction },
    });
  }

  async update(
    missionId: number,
    totalWeight: number,
    totalQuantity: number,
    transaction: Transaction,
  ) {
    const mission = await this.missionRepository.findOne({
      where: { id: missionId },
      error: { code: 101010, message: 'Something wrong happened' },
    });

    await this.missionRepository.update({
      where: { id: missionId },
      update: {
        limit: mission.limit - totalQuantity,
        energy: mission.energy - totalWeight,
      },
      transaction,
    });
  }

  async addItemsToMission(
    missionId: number,
    items: { id: number; quantity: number }[],
    transaction: Transaction,
  ) {
    for (const item of items) {
      const magicItemMission = await this.magicItemMissionRepository.findOne({
        where: { missionId, magicItemId: item.id },
      });

      if (!magicItemMission) {
        await this.magicItemMissionRepository.create({
          doc: { missionId, magicItemId: item.id, quantity: item.quantity },
          options: { transaction },
        });
      } else {
        await this.magicItemMissionRepository.update({
          where: {
            missionId,
            magicItemId: item.id,
          },
          update: {
            quantity: item.quantity + magicItemMission.quantity,
          },
          transaction,
        });
      }
    }
  }
}
