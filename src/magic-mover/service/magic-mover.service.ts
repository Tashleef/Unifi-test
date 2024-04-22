import { Injectable } from '@nestjs/common';
import { MagicMoverRepository } from '../data/magic-mover.repository';
import { MagicMoverError } from './magic-mover-error.service';

@Injectable()
export class MagicMoverService {
  constructor(
    private magicMoverRepository: MagicMoverRepository,
    private magicMoverError: MagicMoverError,
  ) {}
}
