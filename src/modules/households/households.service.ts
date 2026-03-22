import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { CreateHouseholdDto } from './dto';

@Injectable()
export class HouseholdsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateHouseholdDto) {
    return this.prisma.household.create({
      data: {
        name: dto.name,
        city: dto.city,
        commune: dto.commune,
        currencyCode: dto.currencyCode || 'CDF',
        createdById: userId,
      },
    });
  }

  findMine(userId: string) {
    return this.prisma.household.findMany({
      where: { createdById: userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}