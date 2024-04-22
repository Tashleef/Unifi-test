import { Injectable } from '@nestjs/common';
import { Error } from 'additions/component/Error/error';
import { errorCode } from 'additions/component/Error/error-codes';

@Injectable()
export class MagicItemError {
  notFoundError: Error = {
    message: 'Magic Item Not Found',
    code: errorCode.notFoundItem,
  };

  notEnoughEnergyError: Error = {
    message: 'Not Enough Energy',
    code: errorCode.notEnoughEnergy,
  };

  itemOverLimitError: Error = {
    message: 'You Cannot Carry this number of magic items',
    code: errorCode.notItemOverLimit,
  };

  notFound() {
    return this.notFoundError;
  }

  notEnoughEnergy() {
    return this.notEnoughEnergyError;
  }

  itemOverLimit() {
    return this.itemOverLimitError;
  }
}
