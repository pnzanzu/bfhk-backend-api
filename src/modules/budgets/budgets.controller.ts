import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BudgetsService } from './budgets.service';
import { CreateBudgetWeekDto } from './dto';

@ApiTags('budgets')
@ApiBearerAuth()
@Controller('budget-weeks')
@UseGuards(JwtAuthGuard)
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Body() dto: CreateBudgetWeekDto) {
    return this.budgetsService.create(dto);
  }

  @Get('current')
  current(@Query('householdId') householdId: string) {
    return this.budgetsService.findCurrent(householdId);
  }
}