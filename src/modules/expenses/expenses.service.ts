import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { CreateExpenseDto } from './dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        householdId: dto.householdId,
        budgetWeekId: dto.budgetWeekId,
        category: dto.category,
        amount: dto.amount,
        operationDate: new Date(dto.operationDate),
        note: dto.note,
        authorUserId: userId,
      },
    });
  }

  listByBudgetWeek(budgetWeekId: string) {
    return this.prisma.expense.findMany({
      where: { budgetWeekId },
      orderBy: { operationDate: 'desc' },
    });
  }
}