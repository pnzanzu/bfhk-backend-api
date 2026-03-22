import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService, PrismaService],
})
export class IncomesModule {}