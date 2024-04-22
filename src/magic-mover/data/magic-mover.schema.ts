import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  HasOne,
  DefaultScope,
} from 'sequelize-typescript';
import { Mission } from 'src/mission/data/mission.schema';

export enum state {
  resting = 'resting',
  loading = 'loading',
  onMission = 'onMission',
  completedMission = 'completedMission',
}

export const nextStep: { [K in state]: state[] } = {
  resting: [state.loading],
  loading: [state.onMission],
  onMission: [state.resting],
  completedMission: [],
};

@DefaultScope({
  order: [
    ['completedMissions', 'DESC'],
    ['id', 'ASC'],
  ],
})
@Table({
  tableName: 'magic_movers',
  modelName: 'MagicMover',
})
export class MagicMover extends Model<MagicMover> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  limit: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  energy: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: state.resting,
  })
  state: state;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  completedMissions?: number;

  @ForeignKey(() => Mission)
  @Column({ type: DataType.INTEGER, allowNull: true })
  currentMissionId?: number;

  @BelongsTo(() => Mission, 'currentMissionId')
  mission: Mission;
}

export enum actions {
  created = 'created',
  statusUpdated = 'statusUpdated',
}

@DefaultScope({
  order: [['id', 'DESC']],
})
@Table({ tableName: 'magic_mover_logs' })
export class MagicMoverLog extends Model<MagicMoverLog> {
  @ForeignKey(() => MagicMover)
  @Column({ type: DataType.INTEGER, allowNull: false })
  moverId: number;

  @BelongsTo(() => MagicMover)
  mover: MagicMover;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: state;
}
