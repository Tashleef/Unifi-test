import { state } from 'src/magic-mover/data/magic-mover.schema';

export class CreateMagicMover {
  name: string;
  limit: number;
  energy: number;
}

export class UpdateMagicMover {
  state: state;
  completedMissions?: number;
}

export class LoadItems {
  items: Item[];
}

export class Item {
  id: number;
  quantity: number;
}
