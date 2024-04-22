import { Injectable } from '@nestjs/common';
import { Error } from 'additions/component/Error/error';
import { errorCode } from 'additions/component/Error/error-codes';

@Injectable()
export class MagicMoverError {
  notFoundError: Error = {
    message: 'Magic Mover Not Found',
    code: errorCode.notFoundMover,
  };

  notInLoadStateError: Error = {
    message: 'Magic Mover is not in loading state',
    code: errorCode.notLoadingState,
  };
  cannotGoToMissionError: Error = {
    message: 'Magic Mover has not loaded anything yet',
    code: errorCode.cannotGoToMission,
  };

  notValidStateError: Error = {
    message: 'Magic Mover cannot be updated to this state',
    code: errorCode.notValidState,
  };

  notFound() {
    return this.notFoundError;
  }
  notLoadingState() {
    return this.notInLoadStateError;
  }
  notValidState() {
    return this.notValidStateError;
  }
  cannotGoToMission() {
    return this.cannotGoToMissionError;
  }
}
