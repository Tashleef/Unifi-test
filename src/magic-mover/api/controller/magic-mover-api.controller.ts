import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MagicMoverApiService } from 'src/magic-mover/service/magic-mover-api.service';
import { MagicMoverValidation } from '../validation';
import { CreateMagicMover, LoadItems, UpdateMagicMover } from '../dto/request';
import { Params } from 'additions/component/params/params';
import { TransactionInterceptor } from 'additions/component/database/transaction/transaction.interceptor';
import { TransactionParam } from 'additions/component/database/transaction/transaction.decorator';
import { Transaction } from 'sequelize';
import { Pagination } from 'additions/pagination/dto';
import { GetAllMoversResponse } from '../dto/response/get-all-movers.dto';
import { GetAllMoversLogsResponse } from '../dto/response/get-all-movers-logs.dto ';
import { paginationParser } from 'additions/pagination/pagination';

@Controller('magic-movers')
export class MagicMoverApiController {
  constructor(
    private readonly magicMoverService: MagicMoverApiService,
    private readonly magicMoverValidation: MagicMoverValidation,
  ) {}

  @Post('')
  async create(@Body() body: CreateMagicMover) {
    this.magicMoverValidation.create({ body });
    const magicMover = await this.magicMoverService.create(body);
    return { id: magicMover.id };
  }

  @Get('/logs')
  async getLogs(@Query() query: Pagination) {
    this.magicMoverValidation.getAll({ query });
    const { pagination } = paginationParser(query);
    const logs = await this.magicMoverService.findAllLogs(pagination);
    return {
      count: logs.count,
      rows: logs.rows.map((log) =>
        new GetAllMoversLogsResponse({ log }).toObject(),
      ),
    };
  }
  @Get('')
  async getAll(@Query() query: Pagination) {
    this.magicMoverValidation.getAll({ query });
    const { pagination } = paginationParser(query);
    const magicMovers = await this.magicMoverService.findAll(pagination);
    return {
      count: magicMovers.count,
      rows: magicMovers.rows.map((mover) =>
        new GetAllMoversResponse({ magicMover: mover }).toObject(),
      ),
    };
  }

  @Patch('/:id')
  @UseInterceptors(TransactionInterceptor)
  async update(
    @Body() body: UpdateMagicMover,
    @Param() params: Params,
    @TransactionParam() transaction: Transaction,
  ) {
    console.log('transaction', transaction);
    this.magicMoverValidation.update({ body, params });
    await this.magicMoverService.update(body, params, transaction);
    return;
  }

  @Patch('/load-items/:id')
  @UseInterceptors(TransactionInterceptor)
  async loadItems(
    @Body() body: LoadItems,
    @Param() params: Params,
    @TransactionParam() transaction: Transaction,
  ) {
    this.magicMoverValidation.loadItems({ body, params });
    await this.magicMoverService.loadItems(body, params, transaction);
    return;
  }
}
