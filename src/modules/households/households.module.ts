import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { HouseholdsController } from './households.controller';
import { HouseholdsService } from './households.service';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService, PrismaService],
})
export class HouseholdsModule {}