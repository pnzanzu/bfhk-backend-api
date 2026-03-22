import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { FoodBasketService } from './food-basket.service';

@Module({
  controllers: [PricesController],
  providers: [PricesService, FoodBasketService, PrismaService],
})
export class PricesModule {}