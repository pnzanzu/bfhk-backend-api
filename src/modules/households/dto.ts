import { IsOptional, IsString } from 'class-validator';

export class CreateHouseholdDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  commune?: string;

  @IsOptional()
  @IsString()
  currencyCode?: string;
}