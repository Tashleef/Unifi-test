import { Injectable } from '@nestjs/common';
import { CreateMagicItem } from '../dto/request';
import * as joi from 'joi';
import { JoiValidationPipe } from 'additions/validation/joi.pipe';

@Injectable()
export class MagicItemValidation {
  create({ body }: { body: CreateMagicItem }) {
    const create = joi
      .object({
        name: joi.string().required(),
        weight: joi.number().min(1).required(),
      })
      .required();

    return new JoiValidationPipe(create).transform(body);
  }
}
