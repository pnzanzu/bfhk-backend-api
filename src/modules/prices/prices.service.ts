import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { CreatePriceReportDto } from './dto';

@Injectable()
export class PricesService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreatePriceReportDto) {
    return this.prisma.priceReport.create({
      data: {
        productId: dto.productId,
        marketLocationId: dto.marketLocationId,
        unit: dto.unit,
        price: dto.price,
        currencyCode: dto.currencyCode || 'CDF',
        observedOn: new Date(dto.observedOn),
        reportedByUserId: userId,
      },
    });
  }

  async daily() {
    const reports = await this.prisma.priceReport.findMany({
      include: { product: true, marketLocation: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return reports.map((report) => ({
      id: report.id,
      product: report.product.name,
      market: report.marketLocation.marketName,
      city: report.marketLocation.city,
      unit: report.unit,
      price: Number(report.price),
      currencyCode: report.currencyCode,
      observedOn: report.observedOn,
      validationStatus: report.validationStatus,
    }));
  }

  listProducts() {
    return this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  listMarkets() {
    return this.prisma.marketLocation.findMany({
      where: { isActive: true },
      orderBy: { marketName: 'asc' },
    });
  }

  async listProvinces() {
    const rows = await this.prisma.marketLocation.findMany({
      distinct: ['province'],
      select: { province: true },
      where: { isActive: true },
      orderBy: { province: 'asc' },
    });

    return rows.filter((r) => r.province);
  }

  async byProvince(province: string) {
    const reports = await this.prisma.priceReport.findMany({
      where: {
        marketLocation: {
          province,
        },
      },
      include: {
        product: true,
        marketLocation: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    return reports.map((report) => ({
      id: report.id,
      province: report.marketLocation.province,
      city: report.marketLocation.city,
      commune: report.marketLocation.commune,
      market: report.marketLocation.marketName,
      product: report.product.name,
      unit: report.unit,
      price: Number(report.price),
      currencyCode: report.currencyCode,
      observedOn: report.observedOn,
    }));
  }

  async mapData() {
    const reports = await this.prisma.priceReport.findMany({
      include: {
        product: true,
        marketLocation: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    return reports
      .filter((r) => r.marketLocation.latitude && r.marketLocation.longitude)
      .map((r) => ({
        id: r.id,
        product: r.product.name,
        price: Number(r.price),
        unit: r.unit,
        currencyCode: r.currencyCode,
        province: r.marketLocation.province,
        city: r.marketLocation.city,
        market: r.marketLocation.marketName,
        latitude: r.marketLocation.latitude,
        longitude: r.marketLocation.longitude,
        observedOn: r.observedOn,
      }));
  }
}