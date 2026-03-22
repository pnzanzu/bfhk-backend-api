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
exports.FoodBasketService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/prisma.service");
let FoodBasketService = class FoodBasketService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calculate(city, familySize) {
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
            if (!p.product.weeklyConsumptionPerPerson)
                continue;
            const quantity = p.product.weeklyConsumptionPerPerson * familySize;
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
};
exports.FoodBasketService = FoodBasketService;
exports.FoodBasketService = FoodBasketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FoodBasketService);
//# sourceMappingURL=food-basket.service.js.map