import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  householdId!: string;

  @IsString()
  budgetWeekId!: string;

  @IsString()
  category!: string;

  @IsNumber()
  amount!: number;

  @IsDateString()
  operationDate!: string;

  @IsOptional()
  @IsString()
  note?: string;
}