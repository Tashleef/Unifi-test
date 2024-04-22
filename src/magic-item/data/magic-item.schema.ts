import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'magic_items',
  modelName: 'MagicItem',
})
export class MagicItem extends Model<MagicItem> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  weight: number;
}
