import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateHouseholdDto } from './dto';
import { HouseholdsService } from './households.service';

@ApiTags('households')
@ApiBearerAuth()
@Controller('households')
@UseGuards(JwtAuthGuard)
export class HouseholdsController {
  constructor(private readonly householdsService: HouseholdsService) {}

  @Post()
  create(@Req() req: { user: { sub: string } }, @Body() dto: CreateHouseholdDto) {
    return this.householdsService.create(req.user.sub, dto);
  }

  @Get()
  findMine(@Req() req: { user: { sub: string } }) {
    return this.householdsService.findMine(req.user.sub);
  }
}