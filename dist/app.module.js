"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const prisma_service_1 = require("./config/prisma.service");
const auth_module_1 = require("./modules/auth/auth.module");
const households_module_1 = require("./modules/households/households.module");
const budgets_module_1 = require("./modules/budgets/budgets.module");
const expenses_module_1 = require("./modules/expenses/expenses.module");
const incomes_module_1 = require("./modules/incomes/incomes.module");
const prices_module_1 = require("./modules/prices/prices.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            households_module_1.HouseholdsModule,
            budgets_module_1.BudgetsModule,
            expenses_module_1.ExpensesModule,
            incomes_module_1.IncomesModule,
            prices_module_1.PricesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map