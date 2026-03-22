import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { CreateIncomeDto } from './dto';

@Injectable()
export class IncomesService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateIncomeDto) {
    return this.prisma.income.create({
      data: {
        householdId: dto.householdId,
        budgetWeekId: dto.budgetWeekId,
        sourceLabel: dto.sourceLabel,
        amount: dto.amount,
        operationDate: new Date(dto.operationDate),
        note: dto.note,
        authorUserId: userId,
      },
    });
  }

  listByBudgetWeek(budgetWeekId: string) {
    return this.prisma.income.findMany({
      where: { budgetWeekId },
      orderBy: { operationDate: 'desc' },
    });
  }
}