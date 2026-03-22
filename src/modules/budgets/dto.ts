import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBudgetWeekDto {
  @IsString()
  householdId!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsNumber()
  plannedBudget!: number;

  @IsOptional()
  @IsNumber()
  plannedFoodBudget?: number;

  @IsOptional()
  @IsNumber()
  savingsGoal?: number;
}