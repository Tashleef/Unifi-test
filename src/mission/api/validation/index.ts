import { Injectable } from '@nestjs/common';
import { CreateMission } from '../dto/request';
import * as joi from 'joi';
import { JoiValidationPipe } from 'additions/validation/joi.pipe';

@Injectable()
export class MissionValidation {
  create({ body }: { body: CreateMission }) {
    const create = joi
      .object({
        name: joi.string().required(),
        limit: joi.number().min(1).required(),
      })
      .required();

    return new JoiValidationPipe(create).transform(body);
  }
}
