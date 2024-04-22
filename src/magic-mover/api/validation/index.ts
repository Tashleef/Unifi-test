import { Injectable } from '@nestjs/common';
import { CreateMagicMover, LoadItems, UpdateMagicMover } from '../dto/request';
import * as joi from 'joi';
import { JoiValidationPipe } from 'additions/validation/joi.pipe';
import { state } from 'src/magic-mover/data/magic-mover.schema';
import { Params } from 'additions/component/params/params';
import { Pagination } from 'additions/pagination/dto';
import { pagination } from 'additions/pagination/validation';

@Injectable()
export class MagicMoverValidation {
  create({ body }: { body: CreateMagicMover }) {
    const create = joi
      .object({
        name: joi.string().required(),
        limit: joi.number().min(1).required(),
        energy: joi.number().min(1).required(),
      })
      .required();

    return new JoiValidationPipe(create).transform(body);
  }

  update({ body, params }: { body: UpdateMagicMover; params: Params }) {
    const update = joi
      .object({
        state: joi
          .string()
          .valid(...Object.values(state))
          .required(),
      })
      .required();
    this.paramsId({ params });
    return new JoiValidationPipe(update).transform(body);
  }

  getAll({ query }: { query: Pagination }) {
    const getAll = joi.object({
      ...pagination(),
    });
    return new JoiValidationPipe(getAll).transform(query);
  }

  loadItems({ body, params }: { body: LoadItems; params: Params }) {
    const load = joi
      .object({
        items: joi
          .array()
          .items(
            joi
              .object({
                id: joi.number().min(1).required(),
                quantity: joi.number().min(1).required(),
              })
              .required(),
          )
          .required()
          .min(1),
      })
      .required();

    this.paramsId({ params });

    return new JoiValidationPipe(load).transform(body);
  }

  paramsId({ params }: { params: Params }) {
    const id = joi.object({
      id: joi.number().min(1).required(),
    });

    return new JoiValidationPipe(id).transform(params);
  }
}
