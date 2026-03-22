-- CreateTable
CREATE TABLE "PriceDailyAggregate" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "marketLocationId" TEXT NOT NULL,
    "observedOn" TIMESTAMP(3) NOT NULL,
    "avgPrice" DECIMAL(14,2) NOT NULL,
    "minPrice" DECIMAL(14,2) NOT NULL,
    "maxPrice" DECIMAL(14,2) NOT NULL,
    "reportCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceDailyAggregate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PriceDailyAggregate" ADD CONSTRAINT "PriceDailyAggregate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceDailyAggregate" ADD CONSTRAINT "PriceDailyAggregate_marketLocationId_fkey" FOREIGN KEY ("marketLocationId") REFERENCES "MarketLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
