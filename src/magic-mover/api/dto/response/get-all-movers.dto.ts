import { MagicMover } from 'src/magic-mover/data/magic-mover.schema';

export class GetAllMoversResponse {
  id: number;
  name: string;
  completedMissions: number;
  limit: number;
  energy: number;
  constructor({
    magicMover,
    languageKey,
  }: {
    magicMover: MagicMover;
    languageKey?: string;
  }) {
    this.id = magicMover.id;
    this.name = magicMover.name;
    this.completedMissions = magicMover.completedMissions;
    this.limit = magicMover.limit;
    this.energy = magicMover.energy;
  }

  toObject(): {
    id: number;
    name: string;
    completedMissions: number;
    limit: number;
    energy: number;
  } {
    return {
      id: this.id,
      name: this.name,
      completedMissions: this.completedMissions,
      limit: this.limit,
      energy: this.energy,
    };
  }
}
