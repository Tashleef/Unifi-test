import { Op, WhereOptions } from 'sequelize';
import { MagicMover } from '../data/magic-mover.schema';

// type filterObjects = {
//   fullName?: string;
//   id?: number;
// };

export class MagicMoverFilterObject {
  filter: WhereOptions<MagicMover>;

  constructor() {
    this.filter = {};
  }

  getId(id: number) {
    this.filter['id'] = id;
    return this;
  }

  getParent(parent: number) {
    const parentId = parent ? parent : null;

    this.filter['parentId'] = parentId;
    return this;
  }

  build() {
    return this.filter;
  }
}
