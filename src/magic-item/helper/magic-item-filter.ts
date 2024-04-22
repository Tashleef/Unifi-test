import { Op, WhereOptions } from 'sequelize';
import { MagicItem } from '../data/magic-item.schema';

// type filterObjects = {
//   fullName?: string;
//   id?: number;
// };

export class MagicItemFilterObject {
  filter: WhereOptions<MagicItem>;

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
