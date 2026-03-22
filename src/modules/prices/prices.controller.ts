import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePriceReportDto } from './dto';
import { PricesService } from './prices.service';
import { FoodBasketService } from './food-basket.service';

@ApiTags('prices')
@ApiBearerAuth()
@Controller('prices')
@UseGuards(JwtAuthGuard)
export class PricesController {
  constructor(
    private readonly pricesService: PricesService,
    private readonly foodBasketService: FoodBasketService,
  ) {}

  @Get('daily')
  daily() {
    return this.pricesService.daily();
  }

  @Get('products')
  products() {
    return this.pricesService.listProducts();
  }

  @Get('markets')
  markets() {
    return this.pricesService.listMarkets();
  }

  @Get('food-basket')
  foodBasket(
    @Query('city') city: string,
    @Query('familySize') familySize: string,
  ) {
    return this.foodBasketService.calculate(city, Number(familySize));
  }

  @Get('provinces')
  provinces() {
    return this.pricesService.listProvinces();
  }

  @Get('by-province')
  byProvince(@Query('province') province: string) {
    return this.pricesService.byProvince(province);
  }

  @Get('map')
  map() {
    return this.pricesService.mapData();
  }

  @Post('reports')
  create(
    @Req() req: { user: { sub: string } },
    @Body() dto: CreatePriceReportDto,
  ) {
    return this.pricesService.create(req.user.sub, dto);
  }
}