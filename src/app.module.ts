import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { PrismaService } from './config/prisma.service';

import { AuthModule } from './modules/auth/auth.module';
import { HouseholdsModule } from './modules/households/households.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { IncomesModule } from './modules/incomes/incomes.module';
import { PricesModule } from './modules/prices/prices.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // 🔥 Rate limiting global
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 20,  // 20 requêtes / minute
      },
    ]),

    AuthModule,
    HouseholdsModule,
    BudgetsModule,
    ExpensesModule,
    IncomesModule,
    PricesModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,

    // 🔒 Guard global
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}