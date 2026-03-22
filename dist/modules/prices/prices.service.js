"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/prisma.service");
let PricesService = class PricesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(userId, dto) {
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
    async byProvince(province) {
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
};
exports.PricesService = PricesService;
exports.PricesService = PricesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PricesService);
//# sourceMappingURL=prices.service.js.map