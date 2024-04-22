import { Op, WhereOptions } from 'sequelize';
import { Mission } from '../data/mission.schema';

// type filterObjects = {
//   fullName?: string;
//   id?: number;
// };

export class MissionFilterObject {
  filter: WhereOptions<Mission>;

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
