import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePriceReportDto {
  @IsString()
  productId!: string;

  @IsString()
  marketLocationId!: string;

  @IsString()
  unit!: string;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsString()
  currencyCode?: string;

  @IsDateString()
  observedOn!: string;
}