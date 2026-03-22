import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExpenseDto } from './dto';
import { ExpensesService } from './expenses.service';

@ApiTags('expenses')
@ApiBearerAuth()
@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Req() req: { user: { sub: string } }, @Body() dto: CreateExpenseDto) {
    return this.expensesService.create(req.user.sub, dto);
  }

  @Get()
  list(@Query('budgetWeekId') budgetWeekId: string) {
    return this.expensesService.listByBudgetWeek(budgetWeekId);
  }
}