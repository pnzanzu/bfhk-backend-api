import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  householdId!: string;

  @IsString()
  budgetWeekId!: string;

  @IsString()
  sourceLabel!: string;

  @IsNumber()
  amount!: number;

  @IsDateString()
  operationDate!: string;

  @IsOptional()
  @IsString()
  note?: string;
}