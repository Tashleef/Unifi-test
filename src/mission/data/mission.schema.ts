import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { MagicItem } from 'src/magic-item/data/magic-item.schema';
import { MagicMover } from 'src/magic-mover/data/magic-mover.schema';

@Table({
  tableName: 'missions',
  modelName: 'Mission',
})
export class Mission extends Model<Mission> {
  @ForeignKey(() => MagicMover)
  @Column({ type: DataType.INTEGER, allowNull: false })
  moverId: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  limit: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  energy: number;

  @BelongsTo(() => MagicMover)
  magicMover: MagicMover;
}

@Table({
  tableName: 'magic_item_missions',
  modelName: 'MagicItemMission',
})
export class MagicItemMission extends Model<MagicItemMission> {
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  quantity: number;

  @ForeignKey(() => Mission)
  @Column({ type: DataType.INTEGER, allowNull: false })
  missionId: number;

  @BelongsTo(() => Mission)
  mission: Mission;

  @ForeignKey(() => MagicItem)
  @Column({ type: DataType.INTEGER, allowNull: false })
  magicItemId: number;

  @BelongsTo(() => MagicItem)
  magicItem: MagicItem;
}
