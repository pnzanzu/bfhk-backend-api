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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const dto_1 = require("./dto");
const prices_service_1 = require("./prices.service");
const food_basket_service_1 = require("./food-basket.service");
let PricesController = class PricesController {
    constructor(pricesService, foodBasketService) {
        this.pricesService = pricesService;
        this.foodBasketService = foodBasketService;
    }
    daily() {
        return this.pricesService.daily();
    }
    products() {
        return this.pricesService.listProducts();
    }
    markets() {
        return this.pricesService.listMarkets();
    }
    foodBasket(city, familySize) {
        return this.foodBasketService.calculate(city, Number(familySize));
    }
    provinces() {
        return this.pricesService.listProvinces();
    }
    byProvince(province) {
        return this.pricesService.byProvince(province);
    }
    map() {
        return this.pricesService.mapData();
    }
    create(req, dto) {
        return this.pricesService.create(req.user.sub, dto);
    }
};
exports.PricesController = PricesController;
__decorate([
    (0, common_1.Get)('daily'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "daily", null);
__decorate([
    (0, common_1.Get)('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "products", null);
__decorate([
    (0, common_1.Get)('markets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "markets", null);
__decorate([
    (0, common_1.Get)('food-basket'),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('familySize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "foodBasket", null);
__decorate([
    (0, common_1.Get)('provinces'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "provinces", null);
__decorate([
    (0, common_1.Get)('by-province'),
    __param(0, (0, common_1.Query)('province')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "byProvince", null);
__decorate([
    (0, common_1.Get)('map'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "map", null);
__decorate([
    (0, common_1.Post)('reports'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreatePriceReportDto]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "create", null);
exports.PricesController = PricesController = __decorate([
    (0, swagger_1.ApiTags)('prices'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('prices'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prices_service_1.PricesService,
        food_basket_service_1.FoodBasketService])
], PricesController);
//# sourceMappingURL=prices.controller.js.map