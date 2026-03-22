import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateIncomeDto } from './dto';
import { IncomesService } from './incomes.service';

@ApiTags('incomes')
@ApiBearerAuth()
@Controller('incomes')
@UseGuards(JwtAuthGuard)
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  create(@Req() req: { user: { sub: string } }, @Body() dto: CreateIncomeDto) {
    return this.incomesService.create(req.user.sub, dto);
  }

  @Get()
  list(@Query('budgetWeekId') budgetWeekId: string) {
    return this.incomesService.listByBudgetWeek(budgetWeekId);
  }
}