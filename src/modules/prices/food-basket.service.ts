import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class FoodBasketService {

  constructor(private prisma: PrismaService) {}

  async calculate(city: string, familySize: number) {

    const prices = await this.prisma.priceReport.findMany({
      include: { product: true, marketLocation: true },
      where: {
        marketLocation: {
          city
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const basket = [];

    let total = 0;

    for (const p of prices) {

      if (!p.product.weeklyConsumptionPerPerson) continue;

      const quantity =
        p.product.weeklyConsumptionPerPerson * familySize;

      const cost = quantity * Number(p.price);

      basket.push({
        product: p.product.name,
        price: Number(p.price),
        quantity,
        cost
      });

      total += cost;
    }

    return {
      city,
      familySize,
      total,
      basket
    };
  }
}