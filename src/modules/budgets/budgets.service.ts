import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { CreateBudgetWeekDto } from './dto';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBudgetWeekDto) {
    return this.prisma.budgetWeek.create({
      data: {
        householdId: dto.householdId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        plannedBudget: dto.plannedBudget,
        plannedFoodBudget: dto.plannedFoodBudget,
        savingsGoal: dto.savingsGoal,
      },
    });
  }

  findCurrent(householdId: string) {
    return this.prisma.budgetWeek.findFirst({
      where: {
        householdId,
        status: 'open',
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}