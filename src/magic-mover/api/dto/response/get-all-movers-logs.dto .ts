import { MagicMoverLog } from 'src/magic-mover/data/magic-mover.schema';

export class GetAllMoversLogsResponse {
  id: number;
  name: string;
  state: string;
  constructor({
    log,
    languageKey,
  }: {
    log: MagicMoverLog;
    languageKey?: string;
  }) {
    this.id = log.mover.id;
    this.name = log.mover.name;
    this.state = log.state;
  }

  toObject(): { id: number; name: string; state: string } {
    return {
      id: this.id,
      name: this.name,
      state: this.state,
    };
  }
}
