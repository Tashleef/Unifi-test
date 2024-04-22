import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { MagicMoverModule } from './magic-mover/magic-mover.module';
import { MagicItemModule } from './magic-item/magic-item.module';
import { MissionModule } from './mission/mission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: configsSchema,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      logging: true,
      sync: {
        alter: true,
      },
    }),
    MagicMoverModule,
    MagicItemModule,
    MissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
