import { Injectable } from '@nestjs/common';
import { MagicMover, MagicMoverLog } from './magic-mover.schema';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from 'additions/component/database/sequelize/sequelize.repository';

@Injectable()
export class MagicMoverRepository extends SequelizeRepository<MagicMover> {
  constructor(
    @InjectModel(MagicMover)
    magicMoverRepository: typeof MagicMover,
  ) {
    super(magicMoverRepository);
  }
}

@Injectable()
export class MagicMoverLogRepository extends SequelizeRepository<MagicMoverLog> {
  constructor(
    @InjectModel(MagicMoverLog)
    magicMoverLogRepository: typeof MagicMoverLog,
  ) {
    super(magicMoverLogRepository);
  }
}
