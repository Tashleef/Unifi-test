import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Observable, catchError, tap } from 'rxjs';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
@Injectable()
@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(
    @InjectConnection()
    private readonly sequelizeInstance: Sequelize,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();

    const transaction: Transaction = await this.sequelizeInstance.transaction();
    req.transaction = transaction;

    return next.handle().pipe(
      catchError(async (err) => {
        await transaction.rollback();
        console.log('rolling back');
        throw err;
      }),
      tap(async () => {
        console.log('commited');
        await transaction.commit();
      }),
    );
  }
}
